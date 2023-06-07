import { PrimitiveIntersection } from "../../../../tests/cases/mini/miniTest";

export const validatePrimitiveIntersection = (value: unknown) => {
    const typedValue = value as PrimitiveIntersection;
    const error = [];
    if (typeof typedValue.t1 !== 'string') {
        error.push({
            propertyName: 't1',
            propertyChainTrace: [],
            expectedType: 'string',
            received: typedValue,
        });
    }
    if (typeof typedValue.t2 !== 'number') {
        error.push({
            propertyName: 't2',
            propertyChainTrace: [],
            expectedType: 'number',
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}