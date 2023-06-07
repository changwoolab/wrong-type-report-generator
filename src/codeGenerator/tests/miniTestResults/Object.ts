export const validateObject = (value: unknown) => {
    const typedValue = value as Object;
    const error = [];
    if (typeof typedValue !== 'number') {
        error.push({
            propertyName: 't1',
            propertyChainTrace: [],
            expectedType: 'number',
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
