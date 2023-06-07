import { WithGenerics } from "../../../../tests/cases/mini/miniTest";

export const validateWithGenerics = (value: unknown) => {
    const typedValue = value as WithGenerics;
    const error = [];
    if (typedValue.t1 !== null &&
        typeof typedValue.t1 !== 'string') {
        error.push({
            propertyName: 't1',
            propertyChainTrace: [],
            expectedType: ['null | object'],
            received: typedValue.t1,
        });
    }
    return error.length === 0 ? undefined : error;
}
