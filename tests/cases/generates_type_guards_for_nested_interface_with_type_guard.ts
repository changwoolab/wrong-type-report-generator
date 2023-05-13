// 'generates type guards for nested interface with type guard',

export interface Bar {
    bar: number;
}

export interface Foo {
    foo: Bar;
}
