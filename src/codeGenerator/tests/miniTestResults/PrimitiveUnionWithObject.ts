import { PrimitiveUnionWithObject } from "../../../../tests/cases/mini/miniTest";

export const validatePrimitiveUnionWithObject = (value: unknown) => {
    const typedValue = value as PrimitiveUnionWithObject;
    const error = [];
    if ((() => {
        const prevErrorLen = error.length;
        if (typedValue === null ||
            (typeof typedValue !== "object" &&
                typeof typedValue !== "function")) {
            error.push({
                propertyName: 'unionElement',
                propertyChainTrace: [],
                expectedType: 'object',
                received: typedValue,
            });
        } else {
            if (typeof typedValue.t1 !== 'number') {
                error.push({
                    propertyName: 't1',
                    propertyChainTrace: [],
                    expectedType: 'number',
                    received: typedValue,
                });
            }
        }
        return prevErrorLen !== error.length;
    })() &&
        (() => {
            const prevErrorLen = error.length;
            if (typedValue === null ||
                (typeof typedValue !== "object" &&
                    typeof typedValue !== "function")) {
                error.push({
                    propertyName: 'unionElement',
                    propertyChainTrace: [],
                    expectedType: 'object',
                    received: typedValue,
                });
            } else {
                if (typeof typedValue.t2 !== 'string') {
                    error.push({
                        propertyName: 't2',
                        propertyChainTrace: [],
                        expectedType: 'string',
                        received: typedValue,
                    });
                }
            }
            return prevErrorLen !== error.length;
        })()) {
        error.push({
            propertyName: 'PrimitiveUnionWithObject',
            propertyChainTrace: [],
            expectedType: ['object | object'],
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
