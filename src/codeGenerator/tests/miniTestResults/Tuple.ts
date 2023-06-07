import { Tuple } from "../../../../tests/cases/mini/miniTest";

export const validateTuple = (value: unknown) => {
    const typedValue = value as Tuple;
    const error = [];
    if (typedValue === null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'Tuple',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (!Array.isArray(typedValue.test1)) {
            error.push({
                propertyName: 'test1',
                propertyChainTrace: [],
                expectedType: 'tuple',
                received: typedValue,
            });
        } else {
            if (typeof typedValue.test1[0] !== 'number') {
                error.push({
                    propertyName: 'test1[0]',
                    propertyChainTrace: [],
                    expectedType: 'number',
                    received: typedValue,
                });
            }
        }
        if (!Array.isArray(typedValue.test2)) {
            error.push({
                propertyName: 'test2',
                propertyChainTrace: [],
                expectedType: 'tuple',
                received: typedValue,
            });
        } else {
            if (typeof typedValue.test2[0] !== 'number') {
                error.push({
                    propertyName: 'test2[0]',
                    propertyChainTrace: [],
                    expectedType: 'number',
                    received: typedValue,
                });
            }
            if (typeof typedValue.test2[1] !== 'string') {
                error.push({
                    propertyName: 'test2[1]',
                    propertyChainTrace: [],
                    expectedType: 'string',
                    received: typedValue,
                });
            }
        }
    }
    return error.length === 0 ? undefined : error;
}
