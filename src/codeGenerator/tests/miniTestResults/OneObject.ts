/* eslint-disable */
// @ts-nocheck
import { OneObject } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateOneObject = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as OneObject;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue == null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'OneObject',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (typeof typedValue.t1 !== 'number') {
            error.push({
                propertyName: 't1',
                propertyChainTrace: [],
                expectedType: 'number',
                received: typedValue.t1,
            });
        }
    }
    return error.length === 0 ? undefined : error;
}
