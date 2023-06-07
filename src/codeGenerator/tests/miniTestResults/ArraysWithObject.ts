import { ArraysWithObject } from "../../../../tests/cases/mini/miniTest";

export const validateArraysWithObject = (value: unknown) => {
    const typedValue = value as ArraysWithObject;
    const error = [];
    if (typedValue === null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'ArraysWithObject',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
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
                if (!Array.isArray(elem)) {
                    error.push({
                        propertyName: 'arrayElement',
                        propertyChainTrace: ['t1'],
                        expectedType: 'array',
                        received: elem,
                    });
                } else {
                    elem.find((elem) => {
                        const prevErrorLen = error.length;
                        if (typeof elem.t2 !== 'number') {
                            error.push({
                                propertyName: 't2',
                                propertyChainTrace: ['t1'],
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
    }
    return error.length === 0 ? undefined : error;
}
