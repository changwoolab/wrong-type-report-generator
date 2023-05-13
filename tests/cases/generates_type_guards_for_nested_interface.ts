// 'generates type guards for nested interface',
interface Bar {
    bar: number;
}

export interface Foo {
    foo: Bar;
}
