/* eslint-disable */
import { PrimitiveOneArray } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validatePrimitiveOneArray = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as PrimitiveOneArray;
    const error: GeneratedWrongTypeErrorReport = [];
    if (!Array.isArray(typedValue)) {
        error.push({
            propertyName: 'PrimitiveOneArray',
            propertyChainTrace: [],
            expectedType: 'array',
            received: typedValue,
        });
    } else {
        typedValue.find((elem) => {
            const prevErrorLen = error.length;
            if (typeof elem !== 'number') {
                error.push({
                    propertyName: 'arrayElement',
                    propertyChainTrace: [],
                    expectedType: 'number',
                    received: elem,
                });
            }
            return prevErrorLen !== error.length;
        });
    }
    return error.length === 0 ? undefined : error;
}
