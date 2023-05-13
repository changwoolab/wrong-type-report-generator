// 'generates type guards for interface extending object type',
export type Bar = {
    bar: number;
};

export interface Foo extends Bar {
    foo: number;
}
