import { Union } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateUnion = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as Union;
    const error = [];
    if (typedValue === null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'Union',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (typedValue.t1 !== "asdf" &&
            typedValue.t1 !== "qwer") {
            error.push({
                propertyName: 't1',
                propertyChainTrace: [],
                expectedType: '"asdf" | "qwer"',
                received: typedValue.t1,
            });
        }
        if (typeof typedValue.t2 !== 'string' &&
            typeof typedValue.t2 !== 'number') {
            error.push({
                propertyName: 't2',
                propertyChainTrace: [],
                expectedType: 'string | number',
                received: typedValue.t2,
            });
        }
        if (typeof typedValue.t3 !== 'number' &&
            typedValue.t3 !== "sadf") {
            error.push({
                propertyName: 't3',
                propertyChainTrace: [],
                expectedType: 'number | "sadf"',
                received: typedValue.t3,
            });
        }
        if (typedValue.t4 !== "asdf" &&
            (() => {
                const prevErrorLen = error.length;
                if (!Array.isArray(typedValue.t4)) {
                    error.push({
                        propertyName: 'unionElement',
                        propertyChainTrace: ['t4'],
                        expectedType: 'array',
                        received: typedValue.t4,
                    });
                } else {
                    typedValue.t4.find((elem) => {
                        const prevErrorLen = error.length;
                        if (typeof elem !== 'number') {
                            error.push({
                                propertyName: 'arrayElement',
                                propertyChainTrace: ['t4'],
                                expectedType: 'number',
                                received: elem,
                            });
                        }
                        return prevErrorLen !== error.length;
                    });
                }
                return prevErrorLen !== error.length;
            })()) {
            error.push({
                propertyName: 't4',
                propertyChainTrace: [],
                expectedType: '"asdf" | array',
                received: typedValue.t4,
            });
        }
    }
    return error.length === 0 ? undefined : error;
}
