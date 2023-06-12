export const getNewStack = (stack: string[], name: string, root?: boolean) => {
    return root ? [] : name.includes('Element') ? [...stack] : [...stack, name];
};
