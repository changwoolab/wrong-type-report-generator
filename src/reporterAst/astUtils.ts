import { Type } from 'ts-morph';
import { AstNode } from '.';

export const getNewAst = ({
    name,
    type,
    argument,
}: {
    name: string;
    type: string;
    argument?: AstNode[];
}): AstNode => {
    const ast: AstNode = {
        name,
        type,
        arguments: argument,
    };
    return ast;
};

export const pushNewArgument = (ast: AstNode, argument: AstNode) => {
    const newAst = { ...ast };
    if (newAst.arguments) {
        const newArguments = [...newAst.arguments];
        newArguments.push(argument);
        newAst.arguments = newArguments;
        return newAst;
    }

    newAst.arguments = [argument];
    return newAst;
};
