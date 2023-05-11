import { Type } from 'ts-morph';
import { AstNode } from '../../reporterAst';
import { getNewAst, pushNewArgument } from '../../reporterAst/astUtils';
import { parseNode } from '../transformer';

export const parseUnion = (columnName: string, type: Type) => {
    const unionElements = type.getUnionTypes();

    const newUnionAst = unionElements.map((elem) =>
        parseNode(columnName, elem),
    );

    const unionAst = checkBooleanTypeInLiteral(columnName, newUnionAst);

    return getNewAst(columnName, 'union', unionAst);
};

const checkBooleanTypeInLiteral = (
    columnName: string,
    unionAstNodes: AstNode[],
): AstNode[] => {
    //  booleanLiteral   => "true" | "false"
    //  string union     => "\"true\"" | "\"false\""
    const copiedUnionAstNodes = [...unionAstNodes];
    const withoutBooleanLiterals = copiedUnionAstNodes.filter(
        (node) => node.type !== 'true' && node.type !== 'false',
    );

    // has "true" and "false" at the same time for the same column
    const hasBooleanTypeInLiteral =
        copiedUnionAstNodes.length - 2 === withoutBooleanLiterals.length;

    if (hasBooleanTypeInLiteral) {
        withoutBooleanLiterals.push(getNewAst(columnName, 'boolean'));
        return withoutBooleanLiterals;
    }
    return copiedUnionAstNodes;
};
