import { OneArray } from "../../../../tests/cases/mini/miniTest";

export const validateOneArray = (value: unknown) => {
    const typedValue = value as OneArray;
    const error = [];
    if (!Array.isArray(typedValue.t1)) {
        error.push({
            propertyName: 't1',
            propertyChainTrace: [],
            expectedType: 'array',
            received: typedValue,
        });
    } else {
        typedValue.t1.find((elem) => {
            const prevErrorLen = error.length;
            if (typeof elem !== 'number') {
                error.push({
                    propertyName: 'arrayElement',
                    propertyChainTrace: ['t1'],
                    expectedType: 'number',
                    received: elem,
                });
            }
            return prevErrorLen !== error.length;
        });
    }
    return error.length === 0 ? undefined : error;
}
