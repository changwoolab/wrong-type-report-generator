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

const propertyChain = (nameStack: string[]) => {
    return nameStack.reduce((acc, curr) => {
        return `${acc}['${curr}']`;
    }, '');
};
