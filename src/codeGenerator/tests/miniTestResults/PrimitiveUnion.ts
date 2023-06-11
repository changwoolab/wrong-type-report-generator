/* eslint-disable */
// @ts-nocheck
import { PrimitiveUnion } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validatePrimitiveUnion = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as PrimitiveUnion;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typeof typedValue !== 'number' &&
        typedValue !== "asdf" &&
        typedValue !== "qwer") {
        error.push({
            propertyName: 'PrimitiveUnion',
            propertyChainTrace: [],
            expectedType: 'number | "asdf" | "qwer"',
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
