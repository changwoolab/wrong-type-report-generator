export const getNewStack = (stack: string[], name: string, root?: boolean) => {
    return root ? [] : name.includes('Element') ? [...stack] : [...stack, name];
};

export const wrapQuoteSymbol = (nameStack: string | string[], between?: string) => {
    if (typeof nameStack === 'string') {
        return `'${nameStack}'`;
    }
    return nameStack.map((str) => `'${str}'`).join(between ?? ', ') ?? '';
};

export const getName = (nameStack: string[], namePrefix?: string) => {
    return namePrefix ? `${namePrefix}${propertyChain(nameStack)}` : `typedValue${propertyChain(nameStack)}`;
};

export const isType = (nodeType: string) => {
    const types = [
        'string',
        'number',
        'bigint',
        'boolean',
        'symbol',
        'undefined',
        'null',
        'undefined',
        'any',
        'unknown',
        'never',
    ];
    return types.includes(nodeType);
};

const propertyChain = (nameStack: string[]) => {
    return nameStack.reduce((acc, curr) => {
        return `${acc}['${curr}']`;
    }, '');
};

