import { PrimitiveArraysWithObject } from "../../../../tests/cases/mini/miniTest";

export const validatePrimitiveArraysWithObject = (value: unknown) => {
    const typedValue = value as PrimitiveArraysWithObject;
    const error = [];
    if (!Array.isArray(typedValue)) {
        error.push({
            propertyName: 'PrimitiveArraysWithObject',
            propertyChainTrace: [],
            expectedType: 'array',
            received: typedValue,
        });
    } else {
        typedValue.find((elem) => {
            const prevErrorLen = error.length;
            if (!Array.isArray(elem)) {
                error.push({
                    propertyName: 'arrayElement',
                    propertyChainTrace: [],
                    expectedType: 'array',
                    received: elem,
                });
            } else {
                elem.find((elem) => {
                    const prevErrorLen = error.length;
                    if (typeof elem.t1 !== 'number') {
                        error.push({
                            propertyName: 't1',
                            propertyChainTrace: [],
                            expectedType: 'number',
                            received: elem,
                        });
                    }
                    return prevErrorLen !== error.length;
                });
            }
            return prevErrorLen !== error.length;
        });
    }
    return error.length === 0 ? undefined : error;
}
