export interface InterfaceWithPrimitives {
    number1: number;
    string1: string;
    bigint1: bigint;
    boolean1: boolean;
    undefined1: undefined;
    symbol1: symbol;
    null1: null;
    number2?: number;
    string2?: string;
    bigint2?: bigint;
    boolean2?: boolean;
    undefined2?: undefined;
    symbol2?: symbol;
    null2?: null;
}

export interface ExtendedInterfaceWithPrimitives
    extends InterfaceWithPrimitives {
    thisisincluded: number;
    thisisincluded2?: number;
}

export interface NestedInterfaceWithPrimitives {
    number1: number;
    nested: {
        number2: number;
        string2: string;
    };
}
