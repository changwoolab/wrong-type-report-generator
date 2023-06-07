import { Tuple } from "../../../../tests/cases/mini/miniTest";

export const validateTuple = (value: unknown) => {
    const typedValue = value as Tuple;
    const error = [];


    return error.length === 0 ? undefined : error;
}
