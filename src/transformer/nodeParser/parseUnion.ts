import { Type } from 'ts-morph';
import { parseNode } from '../transformer';

export const parseUnion = (columnName: string, type: Type) => {
    const eachUnionElements = type.getUnionTypes();
    const parsedUnionNodes = eachUnionElements.map((value) => {
        return parseNode(columnName, value);
    });
    const isOptional = parsedUnionNodes.some(
        (node) => node.isOptional === true,
    );

    return {
        name: columnName,
        type: 'union',
        isOptional: isOptional,
        arguments: [...parsedUnionNodes],
    };
};
