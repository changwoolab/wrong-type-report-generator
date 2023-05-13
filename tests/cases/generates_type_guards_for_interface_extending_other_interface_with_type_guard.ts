// 'generates type guards for interface extending other interface with type guard',
export interface Bar {
    bar: number;
}

export interface Foo extends Bar {
    foo: number;
}
