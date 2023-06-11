/* eslint-disable */
// @ts-nocheck
import { Intersection } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateIntersection = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as Intersection;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue == null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'Intersection',
            propertyChainTrace: [],
            expectedType: 'object',
            received: typedValue,
        });
    } else {
        if (typedValue == null ||
            (typeof typedValue !== "object" &&
                typeof typedValue !== "function")) {
            error.push({
                propertyName: 't1',
                propertyChainTrace: [],
                expectedType: 'object',
                received: typedValue,
            });
        } else {
            if (typedValue.t1 == null ||
                (typeof typedValue.t1 !== "object" &&
                    typeof typedValue.t1 !== "function")) {
                error.push({
                    propertyName: 'intersectionElement',
                    propertyChainTrace: ['t1'],
                    expectedType: 'object',
                    received: typedValue.t1,
                });
            } else {
                if (typeof typedValue.t1.t2 !== 'string') {
                    error.push({
                        propertyName: 't2',
                        propertyChainTrace: ['t1'],
                        expectedType: 'string',
                        received: typedValue.t1.t2,
                    });
                }
            }
            if (typedValue.t1 == null ||
                (typeof typedValue.t1 !== "object" &&
                    typeof typedValue.t1 !== "function")) {
                error.push({
                    propertyName: 'intersectionElement',
                    propertyChainTrace: ['t1'],
                    expectedType: 'object',
                    received: typedValue.t1,
                });
            } else {
                if (typeof typedValue.t1.t3 !== 'number') {
                    error.push({
                        propertyName: 't3',
                        propertyChainTrace: ['t1'],
                        expectedType: 'number',
                        received: typedValue.t1.t3,
                    });
                }
            }
        }
    }
    return error.length === 0 ? undefined : error;
}
