import { ParseNode, parseNode } from '../transformer';

export const parseTuple = ({ name, type, addToDependencyMap }: ParseNode) => {
    const types = type.getTupleElements();
    return {
        name: name,
        type: 'tuple',
        argument: types.map((innerType) =>
            parseNode({
                name: 'tupleElement',
                type: innerType,
                addToDependencyMap,
            }),
        ),
    };
};
