/* eslint-disable */
import { PrimitiveIntersection } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validatePrimitiveIntersection = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as PrimitiveIntersection;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue == null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'PrimitiveIntersection',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (typedValue == null ||
            (typeof typedValue !== "object" &&
                typeof typedValue !== "function")) {
            error.push({
                propertyName: 'intersectionElement',
                propertyChainTrace: [],
                expectedType: 'object',
                received: typedValue,
            });
        } else {
            if (typeof typedValue.t1 !== 'string') {
                error.push({
                    propertyName: 't1',
                    propertyChainTrace: [],
                    expectedType: 'string',
                    received: typedValue.t1,
                });
            }
        }
        if (typedValue == null ||
            (typeof typedValue !== "object" &&
                typeof typedValue !== "function")) {
            error.push({
                propertyName: 'intersectionElement',
                propertyChainTrace: [],
                expectedType: 'object',
                received: typedValue,
            });
        } else {
            if (typeof typedValue.t2 !== 'number') {
                error.push({
                    propertyName: 't2',
                    propertyChainTrace: [],
                    expectedType: 'number',
                    received: typedValue.t2,
                });
            }
        }
    }
    return error.length === 0 ? undefined : error;
}
