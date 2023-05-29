import { getNewAstNode } from '../../reporterAst/astUtils';
import { ParseNode, parseNode } from './parseNode';

export const parseArray = ({ name, type, addToDependencyMap }: ParseNode) => {
    return getNewAstNode({
        name,
        type: 'array',
        argument: [
            parseNode({
                name: 'arrayElement',
                type: type,
                addToDependencyMap,
            }),
        ],
    });
};
