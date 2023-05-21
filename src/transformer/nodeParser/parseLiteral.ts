import { getNewAstNode } from '../../reporterAst/astUtils';
import { addTypeToDependencyMap } from '../../utils';
import { ParseNode } from '../transformer';
import { Node } from 'ts-morph';

export const parseLiteral = ({ name, type, addToDependencyMap }: ParseNode) => {
    if (type.isEnumLiteral()) {
        const node = type
            .getSymbol()!
            .getDeclarations()
            .find(Node.isEnumMember)!
            .getParent();

        if (node === undefined || !Node.isEnumDeclaration(node)) {
            throw new Error('Error when parsing Enums');
        }

        // add dependency
        addTypeToDependencyMap(type, addToDependencyMap);

        const enumName = node.getSymbol()?.getName();
        const enumChild = type.getSymbol()?.getName();

        return getNewAstNode({
            name,
            type: `${enumName}.${enumChild}`,
        });
    }
    return getNewAstNode({
        name,
        type: type.getText(),
    });
};
