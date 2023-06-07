import { PrimitiveUnionWithObject } from "../../../../tests/cases/mini/miniTest";

export const validatePrimitiveUnionWithObject = (value: unknown) => {
    const typedValue = value as PrimitiveUnionWithObject;
    const error = [];
    if (typeof typedValue !== 'number' &&
        typeof typedValue !== 'string') {
        error.push({
            propertyName: 'PrimitiveUnionWithObject',
            propertyChainTrace: [],
            expectedType: ['object | object'],
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
