import { Type } from 'ts-morph';
import { AstNode } from '../../reporterAst';
import { getNewAst } from '../../reporterAst/astUtils';
import { parseNode } from '../transformer';

export const parseUnion = (columnName: string, type: Type) => {
    const unionElements = type.getUnionTypes();

    const parsedUnionElements = unionElements.map((elem) =>
        parseNode('unionElement', elem),
    );

    const unionChildren = checkBooleanTypeInLiteral(
        'unionElement',
        parsedUnionElements,
    );

    return getNewAst({
        name: columnName,
        type: 'union',
        argument: unionChildren,
    });
};

const checkBooleanTypeInLiteral = (
    name: string,
    unionAstNodes: AstNode[],
): AstNode[] => {
    //  booleanLiteral   => "true" | "false"
    //  string union     => "\"true\"" | "\"false\""
    const copiedUnionAstNodes = [...unionAstNodes];
    const withoutBooleanLiterals = copiedUnionAstNodes.filter(
        (node) => node.type !== 'true' && node.type !== 'false',
    );

    // has "true" and "false" at the same time for the same column
    // doesn't count for "true" | "true" for now because it is hilarious
    const hasBooleanTypeInLiteral =
        copiedUnionAstNodes.length - 2 === withoutBooleanLiterals.length;

    if (hasBooleanTypeInLiteral) {
        withoutBooleanLiterals.push(getNewAst({ name, type: 'boolean' }));
        return withoutBooleanLiterals;
    }
    return copiedUnionAstNodes;
};
