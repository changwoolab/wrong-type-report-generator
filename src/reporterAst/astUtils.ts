import { Type } from 'ts-morph';
import { AstNode, AstRootNode, Dependencies } from '.';

export const getNewAstNode = ({
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
    };
    if (argument) ast.arguments = argument;
    return ast;
};

export const getNewRootAst = ({
    astNode,
    dependencies,
}: {
    astNode: AstNode;
    dependencies: Dependencies;
}): AstRootNode => {
    return {
        ast: { ...astNode },
        dependencies: new Map(dependencies),
    };
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
