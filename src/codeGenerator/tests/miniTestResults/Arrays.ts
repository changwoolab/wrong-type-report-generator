/* eslint-disable */
import { Arrays } from "../../../../tests/cases/mini/miniTest";
import { GeneratedWrongTypeErrorReport } from "../../../wrongTypeReportGenerator";

export const validateArrays = (value: unknown): GeneratedWrongTypeErrorReport | undefined => {
    const typedValue = value as Arrays;
    const error: GeneratedWrongTypeErrorReport = [];
    if (typedValue == null ||
        (typeof typedValue !== "object" &&
            typeof typedValue !== "function")) {
        error.push({
            propertyName: 'Arrays',
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
                if (!Array.isArray(elem)) {
                    error.push({
                        propertyName: 'arrayElement',
                        propertyChainTrace: ['t1'],
                        expectedType: 'array',
                        received: elem,
                    });
                } else {
                    elem.find((elem) => {
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
                return prevErrorLen !== error.length;
            });
        }
        if (!Array.isArray(typedValue['t2'])) {
            error.push({
                propertyName: 't2',
                propertyChainTrace: [],
                expectedType: 'array',
                received: typedValue,
            });
        } else {
            typedValue['t2'].find((elem) => {
                const prevErrorLen = error.length;
                if (!Array.isArray(elem)) {
                    error.push({
                        propertyName: 'arrayElement',
                        propertyChainTrace: ['t2'],
                        expectedType: 'array',
                        received: elem,
                    });
                } else {
                    elem.find((elem) => {
                        const prevErrorLen = error.length;
                        if (!Array.isArray(elem)) {
                            error.push({
                                propertyName: 'arrayElement',
                                propertyChainTrace: ['t2'],
                                expectedType: 'array',
                                received: elem,
                            });
                        } else {
                            elem.find((elem) => {
                                const prevErrorLen = error.length;
                                if (typeof elem !== 'number') {
                                    error.push({
                                        propertyName: 'arrayElement',
                                        propertyChainTrace: ['t2'],
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
                return prevErrorLen !== error.length;
            });
        }
    }
    return error.length === 0 ? undefined : error;
}
