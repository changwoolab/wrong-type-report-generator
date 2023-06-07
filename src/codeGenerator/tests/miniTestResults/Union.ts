import { Union } from "../../../../tests/cases/mini/miniTest";

export const validateUnion = (value: unknown) => {
    const typedValue = value as Union;
    const error = [];
    if (typedValue.t1 !== "asdf" &&
        typedValue.t1 !== "qwer") {
        error.push({
            propertyName: 't1',
            propertyChainTrace: [],
            expectedType: ['"asdf" | "qwer"'],
            received: typedValue.t1,
        });
    }
    if (typedValue.t2 !== string &&
        typedValue.t2 !== number) {
        error.push({
            propertyName: 't2',
            propertyChainTrace: [],
            expectedType: ['string | number'],
            received: typedValue.t2,
        });
    }
    if (typedValue.t3 !== number &&
        typedValue.t3 !== "sadf") {
        error.push({
            propertyName: 't3',
            propertyChainTrace: [],
            expectedType: ['number | "sadf"'],
            received: typedValue.t3,
        });
    }
    return error.length === 0 ? undefined : error;
}
