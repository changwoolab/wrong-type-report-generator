import { ParseNode, parseNode } from './parseNode';

export const parseTuple = ({ name, type, addToDependencyMap }: ParseNode) => {
    const types = type.getTupleElements();
    return {
        name: name,
        type: 'tuple',
        arguments: types.map((innerType) =>
            parseNode({
                name: 'tupleElement',
                type: innerType,
                addToDependencyMap,
            }),
        ),
    };
};
