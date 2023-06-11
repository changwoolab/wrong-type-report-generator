/* eslint-disable */
import { PrimitiveOneArrayWithObject } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validatePrimitiveOneArrayWithObject = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as PrimitiveOneArrayWithObject;
    const error: GeneratedWrongTypeErrorReport = [];
    if (!Array.isArray(typedValue)) {
        error.push({
            propertyName: 'PrimitiveOneArrayWithObject',
            propertyChainTrace: [],
            expectedType: 'array',
            received: typedValue,
        });
    } else {
        typedValue.find((elem) => {
            const prevErrorLen = error.length;
            if (typeof elem.t1 !== 'number') {
                error.push({
                    propertyName: 't1',
                    propertyChainTrace: [],
                    expectedType: 'number',
                    received: elem.t1,
                });
            }
            return prevErrorLen !== error.length;
        });
    }
    return error.length === 0 ? undefined : error;
}
