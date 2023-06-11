/* eslint-disable */
// @ts-nocheck
import { PrimitiveArrays } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validatePrimitiveArrays = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as PrimitiveArrays;
    const error: GeneratedWrongTypeErrorReport = [];
    if (!Array.isArray(typedValue)) {
        error.push({
            propertyName: 'PrimitiveArrays',
            propertyChainTrace: [],
            expectedType: 'array',
            received: typedValue,
        });
    } else {
        typedValue.find((elem) => {
            const prevErrorLen = error.length;
            if (!Array.isArray(elem)) {
                error.push({
                    propertyName: 'arrayElement',
                    propertyChainTrace: [],
                    expectedType: 'array',
                    received: elem,
                });
            } else {
                elem.find((elem) => {
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
            return prevErrorLen !== error.length;
        });
    }
    return error.length === 0 ? undefined : error;
}
