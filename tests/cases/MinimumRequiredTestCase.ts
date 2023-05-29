export type Nullable<T> = T | null;

/**
 * THIS IS A MINIMUM REQUIREMENT TO PASS
 */
export interface INTEGRATED_TEST {
    test1: {
        test11: string;
        test12: number;
        test13: 'test14' | 'test15';
        test14: TEST1_COLUMN_WITH_GENERICS;
        test15: {
            test141: string;
            test142: number;
            test143: {
                test1431: string;
            };
        };
    };
    test2: string | null;
    test3: Nullable<number>;
    test4: Array<TEST1_COLUMN_WITH_GENERICS>;
    test5: TEST2_ENUMS;
    test6: Array<TEST2_ENUMS>;
    test7: 'test71' | 1 | TEST1_COLUMN_WITH_GENERICS | TEST2_ENUMS;
    test8: string[];
    test9: [string];
    test10: TEST1_COLUMN_WITH_GENERICS[];
    test11: TEST2_ENUMS[];
    test12: Array<{
        test121: string;
        test122: number;
    }>;
    test13: {
        test121: string;
        test122: number;
    }[];
    test14: 1;
    test15: '1';
    test16: TEST3_NAMESPACE.TEST31;
    test17: TEST5_GENERICS<string>;
    test18: TEST5_GENERICS<TEST1_COLUMN_WITH_GENERICS>;
    test19: TEST6_APPLIED_GENERIC_OBJECTS;
    test20: TEST7_APPLIED_NAMESPACE;
    test21: TEST8_INTERSECTION;
}

export interface TEST1_COLUMN_WITH_GENERICS {
    int1: string;
    int2: Nullable<{
        int3: string;
    }>;
}

export enum TEST2_ENUMS {
    test1 = 'TEXT',
    test2 = 1,
    test3,
}

export namespace TEST3_NAMESPACE {
    export interface TEST31 {
        test311: string | { id: number; image: string; description: string }[];
        test312: string;
    }
}

export interface TEST4_ARRAY {
    test41: Array<keyof TEST1_COLUMN_WITH_GENERICS>;
    test42: (keyof TEST1_COLUMN_WITH_GENERICS)[];
}

export type TEST4_1_ARRAY_WITH_OBJECT = Array<TEST1_COLUMN_WITH_GENERICS>;

export interface TEST5_GENERICS<T> {
    test1: string;
    test2: T;
    test3: Array<T>;
}

export interface TEST6_APPLIED_GENERIC_OBJECTS {
    test1: TEST5_GENERICS<TEST4_ARRAY>;
    test2: TEST5_GENERICS<TEST1_COLUMN_WITH_GENERICS>;
}

export interface TEST7_APPLIED_NAMESPACE {
    test1: TEST3_NAMESPACE.TEST31;
}

export interface TEST8_INTERSECTION {
    test1: {
        a: string;
        b: number;
        c: 'asdf';
    } & {
        b: number;
        c: 'asdf';
        d: {
            e: string;
        };
    };
}

export interface TEST9_TUPLE {
    test1: [number];
    test2: [number, TEST2_ENUMS];
}

export interface TEST10_READONLY_ARRAY {
    test1: ReadonlyArray<number>;
    readonly test2: ReadonlyArray<number>;
    readonly test3: number[];
}

export class TEST11_CLASS {
    test1: string;
    test2: number;
    test3: TEST1_COLUMN_WITH_GENERICS;
    constructor() {
        this.test1 = 'test1';
        this.test2 = 1;
        this.test3 = {
            int1: 'test1',
            int2: null,
        };
    }
}
