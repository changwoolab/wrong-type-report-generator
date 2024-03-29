/* eslint-disable */
import { WithGenerics } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateWithGenerics = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as WithGenerics;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue == null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'WithGenerics',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if ((() => {
            const error: GeneratedWrongTypeErrorReport = [];
            let errorCnt = 0;
            if ((() => {
                const prevErrorLen = error.length;
                if (typedValue['t1'] == null ||
                    (typeof typedValue['t1'] !== "object" &&
                        typeof typedValue['t1'] !== "function")) {
                    error.push({
                        propertyName: 'unionElement',
                        propertyChainTrace: ['t1'],
                        expectedType: 'object',
                        received: typedValue['t1'],
                    });
                } else {
                    if (typeof typedValue['t1']['t2'] !== 'string') {
                        error.push({
                            propertyName: 't2',
                            propertyChainTrace: ['t1'],
                            expectedType: 'string',
                            received: typedValue['t1']['t2'],
                        });
                    }
                }
                return prevErrorLen !== error.length;
            })()) {
                errorCnt++;
            }
            return errorCnt === 1;
        })() &&
            typedValue['t1'] !== null) {
            error.push({
                propertyName: 't1',
                propertyChainTrace: [],
                expectedType: 'null | object',
                received: typedValue['t1'],
            });
        }
    }
    return error.length === 0 ? undefined : error;
}
