// 'generates type guards for interface extending other interface',
interface Bar {
    bar: number;
}

export interface Foo extends Bar {
    foo: number;
}
