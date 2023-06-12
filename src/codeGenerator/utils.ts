export const getNewStack = (stack: string[], name: string, root?: boolean) => {
    return root ? [] : name.includes('Element') ? [...stack] : [...stack, name];
};

export const wrapQuoteSymbol = (nameStack: string | string[], between?: string) => {
    if (typeof nameStack === 'string') {
        return `'${nameStack}'`;
    }
    return nameStack.map((str) => `'${str}'`).join(between ?? ', ') ?? '';
};

export const propertyChainDot = (nameStack: string[]) => (nameStack.length > 0 ? '.' + nameStack.join('.') : '');

export const getName = ({ nameStack, namePrefix }: { nameStack: string[]; namePrefix?: string }) => {
    return namePrefix ? `${namePrefix}${propertyChainDot(nameStack)}` : `typedValue${propertyChainDot(nameStack)}`;
};
