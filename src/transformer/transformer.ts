import { Type, Node, Project } from 'ts-morph';
import { TypeDeclaration } from '../types';
import { parseObject } from './parseObject';
import { AstNode } from './types';

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

/**
 * input: ts-morph로 생성된 TypeDeclaration 1개 (AST)
 * output: Typeguard Code Generator를 위한 새로운 AST
 */
export const transformer = (typeDeclaration: TypeDeclaration) => {
    const typeName = typeDeclaration.getName();

    return parseNode(typeName, typeDeclaration.getType());
};

/**
 * input: columnName과 해당 컬럼의 ts-morph Type을 받아서 AST Node를 만들어주는 함수
 * @param columnName
 * @param type
 * @returns `AstNode`
 */
export const parseNode = (columnName: string, type: Type): AstNode => {
    if (type.isNull()) {
        return {
            name: columnName,
            type: 'null',
            isOptional: false,
        };
    }
    if (type.getText() === 'any' || type.getText() === 'unknown') {
        // ?
        return {
            name: columnName,
            type: 'any',
            isOptional: true,
        };
    }
    if (type.getText() === 'never') {
        return {
            name: columnName,
            type: 'never',
            isOptional: true,
        };
    }
    if (type.isBoolean()) {
        return {
            name: columnName,
            type: 'boolean',
            isOptional: false,
        };
    }

    /**
     * Non-primitive Types
     */
    if (type.isUnion()) {
        // TODO
        // "?" 연산자 쓰면 타입이 "~~ | undefined"가 되고 여기로 떨어짐
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
    }
    /**
     * interface or plain object
     */
    if (type.isObject()) {
        // TODO
        return parseObject(columnName, type);
    }
    if (type.isLiteral()) {
        // TODO
    }

    return {
        name: columnName,
        type: type.getText(),
        isOptional:
            (type.isUndefined() || type.getSymbol()?.isOptional()) ?? false,
    };
};
