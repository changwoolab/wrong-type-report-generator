/* eslint-disable */
// @ts-nocheck
import { Enums } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";
export const validateEnums = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as Enums;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue !== Enums.test1 &&
        typedValue !== Enums.test2) {
        error.push({
            propertyName: 'Enums',
            propertyChainTrace: [],
            expectedType: 'Enums.test1 | Enums.test2',
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
