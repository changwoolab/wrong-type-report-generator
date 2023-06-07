import { Nullable } from '../MinimumRequiredTestCase';

export interface OneObject {
    t1: number;
}

export interface WithGenerics {
    t1: Nullable<{
        t2: string;
    }>;
}

export enum Enums {
    test1 = 'test1',
    test2 = 1,
}

namespace Namespace {
    export interface Object {
        t1: number;
    }
}

export interface NameSpace {
    t1: Namespace.Object;
}

export type PrimitiveOneArray = number[];
export type PrimitiveArrays = number[][];
export type PrimitiveOneArrayWithObject = {
    t1: number;
}[];
export type PrimitiveArraysWithObject = {
    t1: number;
}[][];

export interface OneArray {
    t1: number[];
}

export interface Arrays {
    t1: number[][];
    t2: number[][][];
}

export interface OneArrayWithObject {
    t1: {
        t2: number;
    }[];
}

export interface ArraysWithObject {
    t1: {
        t2: number;
    }[][];
}

export type PrimitiveUnion = 'asdf' | 'qwer' | number;
export type PrimitiveUnionWithObject =
    | {
          t1: number;
      }
    | {
          t2: string;
      };

export interface Union {
    t1: 'asdf' | 'qwer';
    t2: number | string;
    t3: 'sadf' | number;
    t4: number[] | 'asdf';
}

export interface UnionWithObject {
    t1:
        | {
              t2: number;
          }
        | {
              t3: string;
          };
}

export type PrimitiveIntersection = {
    t1: string;
} & {
    t2: number;
};

export interface Intersection {
    t1: {
        t2: string;
    } & {
        t3: number;
    };
}

export interface Tuple {
    test1: [number];
    test2: [number, string];
    test3: [OneObject];
}
