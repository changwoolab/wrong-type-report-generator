import { AstNode } from '../reporterAst';

export type GenerateBodyCode = {
    astNode: AstNode;
    nameStack: string[]; // stack for property name
    // propertyChainStack: string[]; // stack for property chain
    root?: boolean;
};

/**
 * Traverse AST Node and generate code
 */
export const generateBodyCode = ({
    astNode,
    nameStack,
    // propertyChainStack,
    root,
}: GenerateBodyCode): string => {
    const newNameStack = root ? [] : [...nameStack, astNode.name];
    switch (astNode.name) {
        case 'arrayElement': {
            if (!astNode.arguments) {
                // This arrayElement is edge node
                // Need to check type
                break;
            }
            return astNode.arguments
                .map((node) => {
                    return generateBodyCode({
                        astNode: node,
                        nameStack: [...nameStack],
                    });
                })
                .join('\n');
        }
    }

    switch (astNode.type) {
        // Enum is considered as union
        case 'enum':
        case 'union': {
            const newNameStack = root ? [] : [...nameStack, astNode.name];
            const conditions = getConditions({
                astNode,
                nameStack: [...newNameStack],
            });

            const childrenTypes =
                astNode.arguments?.map((node) => node.type).join(' | ') ?? '';

            return [
                `if (${conditions.join(' &&\n')}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(nameStack)}],`,
                `        expectedType: [${wrapQuoteSymbol(childrenTypes)}],`,
                `        received: ${getName(newNameStack)},`,
                `    });`,
                `}`,
            ].join('\n');
        }
        case 'array': {
            const statement = astNode.arguments?.map((arrayElement) => {
                if (arrayElement.arguments) {
                    return generateBodyCode({
                        astNode: arrayElement,
                        nameStack: ['elem'],
                    });
                } else {
                    const conditions = getConditions({
                        astNode,
                        nameStack: [], // no nameStack trace is needed because it will be replaced with 'elem'
                    })
                        .map((val) => val.replace('typedValue', 'elem'))
                        .join(' &&\n');
                    return [`if (${conditions}) `];
                }
            });

            // TODO: Need to validate array[][] type correctly

            // Check array elems one by one and push to error when error is occurred.
            // But only one error object should be in the error array.
            return [
                `if (!Array.isArray(${getName([...newNameStack])})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(nameStack)}],`,
                `        expectedType: 'array',`,
                `        received: ${getName(nameStack)},`,
                `    });`,
                `} else {`,
                `    const v = ${getName([...newNameStack])}.find((elem) => {`,
                `       const prevErrorLen = error.length;`,
                `       ${statement}`,
                `       return prevErrorLen !== error.length;`,
                `    });`,
                `    if (v) error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(nameStack)}],`,
                `        expectedType: '${astNode.type}',`,
                `        received: v,`,
                `    });`,
                `}`,
            ].join('\n');
        }
        case 'intersection': {
            // TODO
        }
        case 'tuple': {
            // TODO
        }
        case 'object': {
            const result = astNode.arguments?.map((node) =>
                generateBodyCode({
                    astNode: node,
                    nameStack: [...newNameStack],
                }),
            );

            return result?.join('\n') ?? '';
        }
        default: {
            return [
                `if (${getConditionStatement(astNode, nameStack)}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(nameStack)}],`,
                `        expectedType: '${astNode.type}',`,
                `        received: ${getName(nameStack)},`,
                `    });`,
                `}`,
            ].join('\n');
        }
    }
};

const wrapQuoteSymbol = (nameStack: string | string[], between?: string) => {
    if (typeof nameStack === 'string') {
        return `'${nameStack}'`;
    }
    return nameStack.map((str) => `'${str}'`).join(between ?? ', ') ?? '';
};

const propertyChainDot = (nameStack: string[]) =>
    nameStack.length > 0 ? '.' + nameStack.join('.') : '';

const getName = (nameStack: string[]) => {
    if (nameStack[0] === 'elem') return `elem${propertyChainDot(nameStack)}`;
    return `typedValue${propertyChainDot(nameStack)}`;
};

const getConditions = ({
    astNode,
    nameStack,
}: {
    astNode: AstNode;
    nameStack: string[];
}): string[] => {
    switch (astNode.type) {
        // Enum is considered as union
        case 'enum':
        case 'union': {
            const unionElements = astNode.arguments;
            if (!unionElements) throw new Error('There is no union elements');
            return unionElements.flatMap((unionElemNode) => {
                if (unionElemNode.arguments) {
                    return unionElemNode.arguments.flatMap((nodeChild) =>
                        getConditions({
                            astNode: nodeChild,
                            nameStack: [...nameStack],
                        }),
                    );
                }
                return [getConditionStatement(unionElemNode, nameStack)];
            });
        }
        case 'array': {
            // find one wrong array element
            const arrayElements = astNode.arguments;
            if (!arrayElements) throw new Error('There is no array elements');
            return arrayElements.flatMap((arrayElemNode) => {
                if (arrayElemNode.arguments) {
                    return arrayElemNode.arguments.flatMap((nodeChild) =>
                        getConditions({
                            astNode: nodeChild,
                            nameStack: [...nameStack],
                        }),
                    );
                }
                return [getConditionStatement(astNode, nameStack)];
            });
        }
        case 'intersection': {
            // TODO
        }
        case 'tuple': {
            // TODO
        }
        case 'object': {
            return astNode.arguments!.flatMap((node) =>
                getConditions({
                    astNode: node,
                    nameStack: [...nameStack, astNode.name],
                }),
            );
        }
        default: {
            return [getConditionStatement(astNode, nameStack)];
        }
    }
};

const getConditionStatement = (astNode: AstNode, nameStack: string[]) => {
    if (
        astNode.name === 'enumElement' ||
        astNode.name === 'unionElement' ||
        astNode.type === 'undefined' ||
        astNode.type === 'null'
    ) {
        return `${getName(nameStack)} !== ${astNode.type}`;
    }

    if (astNode.type.startsWith(`\"`) || astNode.type.startsWith(`\'`)) {
        return `typeof ${getName(nameStack)} !== ${astNode.type}`;
    }

    return `typeof ${getName(nameStack)} !== '${astNode.type}'`;
};
