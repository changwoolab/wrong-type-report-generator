import { Intersection } from "../../../../tests/cases/mini/miniTest";

export const validateIntersection = (value: unknown) => {
    const typedValue = value as Intersection;
    const error = [];
    if (typeof typedValue.t1 !== 'string') {
        error.push({
            propertyName: 't2',
            propertyChainTrace: ['t1'],
            expectedType: 'string',
            received: typedValue.t1,
        });
    }
    if (typeof typedValue.t1 !== 'number') {
        error.push({
            propertyName: 't3',
            propertyChainTrace: ['t1'],
            expectedType: 'number',
            received: typedValue.t1,
        });
    }
    return error.length === 0 ? undefined : error;
}
