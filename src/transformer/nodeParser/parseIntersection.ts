import { getNewAstNode } from '../../reporterAst/astUtils';
import { ParseNode, parseNode } from './parseNode';

export const parseIntersection = ({
    name,
    type,
    addToDependencyMap,
}: ParseNode) => {
    const types = type.getIntersectionTypes();
    return getNewAstNode({
        name: name,
        type: 'intersection',
        argument: types.map((innerType) =>
            parseNode({
                name: 'intersectionElement',
                type: innerType,
                addToDependencyMap,
            }),
        ),
    });
};
