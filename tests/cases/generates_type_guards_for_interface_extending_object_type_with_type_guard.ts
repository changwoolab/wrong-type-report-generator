// 'generates type guards for interface extending object type with type guard',
export type Bar = {
    bar: number;
};

export interface Foo extends Bar {
    foo: number;
}
