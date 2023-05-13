// 'generates type guards for interface with optional field',

export interface Foo {
    foo?: number;
    bar: number | undefined;
    baz?: number | undefined;
}
