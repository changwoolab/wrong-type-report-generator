//  'generated type guards with a short circuit are correctly stripped by UglifyJS',
export type Foo = {
    foo: number;
    bar: Foo | string | (() => void);
    baz: 'foo' | 'bar';
};
