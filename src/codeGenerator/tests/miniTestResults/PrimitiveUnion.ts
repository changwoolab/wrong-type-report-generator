import { PrimitiveUnion } from "../../../../tests/cases/mini/miniTest";

export const validatePrimitiveUnion = (value: unknown) => {
    const typedValue = value as PrimitiveUnion;
    const error = [];
    if (typedValue !== number &&
        typedValue !== "asdf" &&
        typedValue !== "qwer") {
        error.push({
            propertyName: 'PrimitiveUnion',
            propertyChainTrace: [],
            expectedType: ['number | "asdf" | "qwer"'],
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
