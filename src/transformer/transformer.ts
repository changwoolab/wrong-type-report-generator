import { Type, Node, Project, SourceFile, ExportableNode } from 'ts-morph';
import { TypeDeclaration } from '../types';
import { parseObject } from './nodeParser/parseObject';
import { parseUnion } from './nodeParser/parseUnion';
import { AstNode, ParentNode } from '../reporterAst';
import { getNewAstNode, getNewRootAst } from '../reporterAst/astUtils';
import { AddToDependencyMap, createAddToDependencyMap } from '../utils';
import { parseLiteral } from './nodeParser/parseLiteral';
import { parseArray } from './nodeParser/parseArray';
import { parseIntersection } from './nodeParser/parseIntersection';
import { parseTuple } from './nodeParser/parseTuple';
import { parseClass } from './nodeParser/parseClass';

/**
 * input: ts-morph로 생성된 TypeDeclaration 1개 (AST)
 * output: Typeguard Code Generator를 위한 새로운 AST
 */
export const transformer = (typeDeclaration: TypeDeclaration) => {
    const typeName = typeDeclaration.getName()!;

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
    parentNode?: ParentNode;
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
    parentNode,
    addToDependencyMap,
}: ParseNode): AstNode => {
    if (type.getText() === 'any' || type.getText() === 'unknown') {
        return getNewAstNode({ name, type: 'any' });
    }

    if (type.getText() === 'never') {
        return getNewAstNode({ name, type: 'never' });
    }

    if (type.isBoolean()) {
        return getNewAstNode({ name, type: 'boolean' });
    }

    if (type.isUnion()) {
        return parseUnion({ name, type, addToDependencyMap, parentNode });
    }

    if (type.isIntersection()) {
        return parseIntersection({
            name,
            type,
            addToDependencyMap,
        });
    }

    if (type.isArray()) {
        return parseArray({
            name,
            type: type.getArrayElementType()!,
            addToDependencyMap,
        });
    }

    if (isClassType(type)) {
        return parseClass({
            name,
            type,
            addToDependencyMap,
        });
    }

    if (type.isTuple()) {
        return parseTuple({
            name,
            type,
            addToDependencyMap,
        });
    }

    /**
     * interface or plain object
     */
    if (type.isObject()) {
        return parseObject({ name, type, addToDependencyMap });
    }

    if (type.isLiteral()) {
        return parseLiteral({ name, type, addToDependencyMap });
    }

    return getNewAstNode({
        name,
        type: type.getText(),
    });
};

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
