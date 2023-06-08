import { OneArray } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateOneArray = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as OneArray;
    const error = [];
    if (typedValue === null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'OneArray',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (!Array.isArray(typedValue.t1)) {
            error.push({
                propertyName: 't1',
                propertyChainTrace: [],
                expectedType: 'array',
                received: typedValue,
            });
        } else {
            typedValue.t1.find((elem) => {
                const prevErrorLen = error.length;
                if (typeof elem !== 'number') {
                    error.push({
                        propertyName: 'arrayElement',
                        propertyChainTrace: ['t1'],
                        expectedType: 'number',
                        received: elem,
                    });
                }
                return prevErrorLen !== error.length;
            });
        }
    }
    return error.length === 0 ? undefined : error;
}
