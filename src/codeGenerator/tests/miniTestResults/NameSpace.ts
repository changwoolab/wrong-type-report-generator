import { NameSpace } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateNameSpace = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as NameSpace;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue === null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'NameSpace',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (typedValue === null ||
            (typeof typedValue !== "object" &&
                typeof typedValue !== "function")) {
            error.push({
                propertyName: 't1',
                propertyChainTrace: [],
                expectedType: 'object',
                received: typedValue,
            });
        } else {
            if (typeof typedValue.t1.t1 !== 'number') {
                error.push({
                    propertyName: 't1',
                    propertyChainTrace: ['t1'],
                    expectedType: 'number',
                    received: typedValue.t1.t1,
                });
            }
        }
    }
    return error.length === 0 ? undefined : error;
}
