import { OneObject } from "../../../../tests/cases/mini/miniTest";

export const validateOneObject = (value: unknown) => {
    const typedValue = value as OneObject;
    const error = [];
    if (typeof typedValue.t1 !== 'number') {
        error.push({
            propertyName: 't1',
            propertyChainTrace: [],
            expectedType: 'number',
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
