import { Type, Node, Project } from 'ts-morph';
import { TypeDeclaration } from '../types';
import { parseObject } from './nodeParser/parseObject';
import { parseUnion } from './nodeParser/parseUnion';
import { AstNode, AstRootNode, Dependency } from '../reporterAst';
import { getNewAst, getNewRootAst } from '../reporterAst/astUtils';

const isClassType = (type: Type): boolean => {
    if (type.getConstructSignatures().length > 0) {
        return true;
    }

    const symbol = type.getSymbol();
    if (symbol == null) {
        return false;
    }

    for (const declaration of symbol.getDeclarations()) {
        if (Node.isClassDeclaration(declaration)) {
            return true;
        }
        if (
            Node.isVariableDeclaration(declaration) &&
            declaration.getType().getConstructSignatures().length > 0
        ) {
            return true;
        }
    }

    return false;
};

const isReadonlyArrayType = (type: Type): boolean => {
    const symbol = type.getSymbol();
    if (symbol === undefined) {
        return false;
    }
    return (
        symbol.getName() === 'ReadonlyArray' &&
        type.getTypeArguments().length === 1
    );
};

export type AddToDependencyMap = (key: string, toAdd: Dependency) => void;

const createAddToDependencyMap = () => {
    const dependencies = new Map<string, Dependency>();

    return {
        addToDependencyMap: (key: string, toAdd: Dependency) => {
            dependencies.set(key, { ...toAdd });
        },
        getDependencyMap: () => dependencies,
    };
};

/**
 * input: ts-morph로 생성된 TypeDeclaration 1개 (AST)
 * output: Typeguard Code Generator를 위한 새로운 AST
 */
export const transformer = (typeDeclaration: TypeDeclaration) => {
    const typeName = typeDeclaration.getName();

    const { getDependencyMap, addToDependencyMap } = createAddToDependencyMap();
    const astNode = parseNode({
        name: typeName,
        type: typeDeclaration.getType(),
        addToDependencyMap,
    });

    return getNewRootAst({ astNode, dependencies: getDependencyMap() });
};

export type ParseNode = {
    name: string;
    type: Type;
    addToDependencyMap: AddToDependencyMap;
};

/**
 * input: name과 해당 컬럼의 ts-morph Type을 받아서 AST Node를 만들어주는 함수
 * @param name
 * @param type
 * @returns `AstNode`
 */
export const parseNode = ({
    name,
    type,
    addToDependencyMap,
}: ParseNode): AstNode => {
    if (type.getText() === 'any' || type.getText() === 'unknown') {
        return getNewAst({ name, type: 'any' });
    }
    if (type.getText() === 'never') {
        return getNewAst({ name, type: 'never' });
    }
    if (type.isBoolean()) {
        return getNewAst({ name, type: 'boolean' });
    }

    /**
     * Non-primitive Types
     */
    if (type.isUnion()) {
        return parseUnion({ name, type, addToDependencyMap });
    }
    if (type.isIntersection()) {
        // TODO
    }
    /**
     * 배열의 타입이 primitive인지 확인한 뒤,
     *      Primitive이라면 ->
     *      Non-primitive이라면 -> 해당 Non-primitive 타입가드를 생성하여 그걸 사용하여 리턴한다.
     */
    if (type.isArray()) {
        // TODO
    }
    if (isReadonlyArrayType(type)) {
        // TODO
    }
    if (isClassType(type)) {
        // TODO
    }
    if (type.isTuple()) {
        // TODO
        console.log('tuple');
    }
    /**
     * interface or plain object
     */
    if (type.isObject()) {
        return parseObject({ name, type, addToDependencyMap });
    }
    if (type.isLiteral()) {
        // TODO
        if (type.isEnumLiteral()) {
            const node = type
                .getSymbol()!
                .getDeclarations()
                .find(Node.isEnumMember)!
                .getParent();
            // add dependency
            console.log(
                node.getSymbol()?.getName(), // enum name
                type.getSymbol()?.getName(), // enum children name
            );
        }
    }

    return {
        name,
        type: type.getText(),
    };
};
