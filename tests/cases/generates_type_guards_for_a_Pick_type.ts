// 'generates type guards for a Pick<> type',
interface Bar {
    foo: number;
    bar: number;
}

export type Foo = Pick<Bar, 'foo'>;
