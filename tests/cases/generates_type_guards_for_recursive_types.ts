// 'generates type guards for recursive types',

export type Branch1 = Branch1[] | string;

export type Branch2 = { branches: Branch2[] } | string;

export type Branch3 =
    | { branches: Branch3[] }
    | { branches: Branch3 }[]
    | string;
