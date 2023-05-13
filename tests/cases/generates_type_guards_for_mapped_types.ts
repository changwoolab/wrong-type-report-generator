// 'generates type guards for mapped types',

export type PropertyValueType = { value: string };

export type PropertyName = 'name' | 'value';

export type Foo = {
    [key in PropertyName]: PropertyValueType;
};
