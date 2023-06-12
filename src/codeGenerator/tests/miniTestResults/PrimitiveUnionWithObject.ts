/* eslint-disable */
import { PrimitiveUnionWithObject } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validatePrimitiveUnionWithObject = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as PrimitiveUnionWithObject;
    const error: GeneratedWrongTypeErrorReport = [];
    if ((() => {
        const error: GeneratedWrongTypeErrorReport = [];
        let errorCnt = 0;
        if ((() => {
            const prevErrorLen = error.length;
            if (typedValue == null ||
                (typeof typedValue !== "object" &&
                    typeof typedValue !== "function")) {
                error.push({
                    propertyName: 'unionElement',
                    propertyChainTrace: [],
                    expectedType: 'object',
                    received: typedValue,
                });
            } else {
                if (typeof typedValue['t1'] !== 'number') {
                    error.push({
                        propertyName: 't1',
                        propertyChainTrace: [],
                        expectedType: 'number',
                        received: typedValue['t1'],
                    });
                }
            }
            return prevErrorLen !== error.length;
        })()) {
            errorCnt++;
        };
        if ((() => {
            const prevErrorLen = error.length;
            if (typedValue == null ||
                (typeof typedValue !== "object" &&
                    typeof typedValue !== "function")) {
                error.push({
                    propertyName: 'unionElement',
                    propertyChainTrace: [],
                    expectedType: 'object',
                    received: typedValue,
                });
            } else {
                if (typeof typedValue['t2'] !== 'string') {
                    error.push({
                        propertyName: 't2',
                        propertyChainTrace: [],
                        expectedType: 'string',
                        received: typedValue['t2'],
                    });
                }
            }
            return prevErrorLen !== error.length;
        })()) {
            errorCnt++;
        };
        if ((() => {
            const prevErrorLen = error.length;
            if (typedValue == null ||
                (typeof typedValue !== "object" &&
                    typeof typedValue !== "function")) {
                error.push({
                    propertyName: 'unionElement',
                    propertyChainTrace: [],
                    expectedType: 'object',
                    received: typedValue,
                });
            } else {
                if (typeof typedValue['t2'] !== 'string') {
                    error.push({
                        propertyName: 't2',
                        propertyChainTrace: [],
                        expectedType: 'string',
                        received: typedValue['t2'],
                    });
                }
                if (typeof typedValue['t3'] !== 'number') {
                    error.push({
                        propertyName: 't3',
                        propertyChainTrace: [],
                        expectedType: 'number',
                        received: typedValue['t3'],
                    });
                }
                if (typedValue['t4'] !== any) {
                    error.push({
                        propertyName: 't4',
                        propertyChainTrace: [],
                        expectedType: 'any',
                        received: typedValue['t4'],
                    });
                }
            }
            return prevErrorLen !== error.length;
        })()) {
            errorCnt++;
        }
        return errorCnt === 3;
    })()) {
        error.push({
            propertyName: 'PrimitiveUnionWithObject',
            propertyChainTrace: [],
            expectedType: 'object | object | object',
            received: typedValue,
        });
    }
    return error.length === 0 ? undefined : error;
}
