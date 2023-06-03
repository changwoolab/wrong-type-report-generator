import { AstNode } from '../../reporterAst';
import { getNewAstNode } from '../../reporterAst/astUtils';
import { ParseNode, parseNode } from './parseNode';

export const parseUnion = ({
    name,
    type,
    isEnum,
    addToDependencyMap,
}: ParseNode) => {
    const unionElements = type.getUnionTypes();

    const parsedUnionElements = unionElements.map((elem) =>
        parseNode({ name: 'unionElement', type: elem, addToDependencyMap }),
    );

    const unionChildren = checkBooleanTypeInLiteral(
        'unionElement',
        parsedUnionElements,
    );

    return getNewAstNode({
        name,
        type: isEnum ? 'enum' : 'union',
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
        withoutBooleanLiterals.push(getNewAstNode({ name, type: 'boolean' }));
        return withoutBooleanLiterals;
    }
    return copiedUnionAstNodes;
};
