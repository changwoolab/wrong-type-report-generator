import { NameSpace } from "../../../../tests/cases/mini/miniTest";

export const validateNameSpace = (value: unknown) => {
    const typedValue = value as NameSpace;
    const error = [];
    if (typeof typedValue.t1 !== 'number') {
        error.push({
            propertyName: 't1',
            propertyChainTrace: ['t1'],
            expectedType: 'number',
            received: typedValue.t1,
        });
    }
    return error.length === 0 ? undefined : error;
}
