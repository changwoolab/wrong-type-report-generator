import { Tuple } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateTuple = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
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
                    received: typedValue.test1,
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
                    received: typedValue.test2,
                });
            }
            if (typeof typedValue.test2[1] !== 'string') {
                error.push({
                    propertyName: 'test2[1]',
                    propertyChainTrace: [],
                    expectedType: 'string',
                    received: typedValue.test2,
                });
            }
        }
        if (!Array.isArray(typedValue.test3)) {
            error.push({
                propertyName: 'test3',
                propertyChainTrace: [],
                expectedType: 'tuple',
                received: typedValue,
            });
        } else {
            if ((() => {
                const prevErrorLen = error.length;
                if (typedValue.test3[0] === null ||
                    (typeof typedValue.test3[0] !== "object" &&
                        typeof typedValue.test3[0] !== "function")) {
                    error.push({
                        propertyName: 'tupleElement',
                        propertyChainTrace: ['test3[0]'],
                        expectedType: 'object',
                        received: typedValue.test3[0],
                    });
                } else {
                    if (typeof typedValue.test3[0].t1 !== 'number') {
                        error.push({
                            propertyName: 't1',
                            propertyChainTrace: ['test3[0]'],
                            expectedType: 'number',
                            received: typedValue.test3[0].t1,
                        });
                    }
                }
                return prevErrorLen !== error.length;
            })()) {
                error.push({
                    propertyName: 'test3[0]',
                    propertyChainTrace: [],
                    expectedType: 'object',
                    received: typedValue.test3,
                });
            }
        }
    }
    return error.length === 0 ? undefined : error;
}
