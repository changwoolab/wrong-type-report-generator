/* eslint-disable */
import { OneArrayWithObject } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateOneArrayWithObject = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as OneArrayWithObject;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue == null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'OneArrayWithObject',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (!Array.isArray(typedValue['t1'])) {
            error.push({
                propertyName: 't1',
                propertyChainTrace: [],
                expectedType: 'array',
                received: typedValue,
            });
        } else {
            typedValue['t1'].find((elem) => {
                const prevErrorLen = error.length;
                if (typeof elem['t2'] !== 'number') {
                    error.push({
                        propertyName: 't2',
                        propertyChainTrace: ['t1'],
                        expectedType: 'number',
                        received: elem['t2'],
                    });
                }
                return prevErrorLen !== error.length;
            });
        }
    }
    return error.length === 0 ? undefined : error;
}
