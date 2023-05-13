// 'Check if any callable properties is a function',
export interface TestType {
    test: () => void;
    // ts-auto-guard-suppress function-type
    test2(someArg: number): boolean;
    // some other comments
    test3: {
        (someArg: string): number;
        test3Arg: number;
    };
}
