import { AstNode } from '../reporterAst';

export type GenerateBodyCode = {
    astNode: AstNode;
    namePrefix?: string; // prefix of property chain
    namePostfix?: string;
    nameStack: string[]; // stack for property name -> ${namePrefix}.${namestack}
    propertyChainStack: string[]; // stack for property chain
    root?: boolean;
};

/**
 * Traverse AST Node and generate code
 */
export const generateBodyCode = ({
    astNode,
    nameStack,
    namePrefix,
    namePostfix,
    propertyChainStack,
    root,
}: GenerateBodyCode): string => {
    const newNameStack = root
        ? []
        : astNode.name.includes('Element')
        ? [...nameStack]
        : [...nameStack, astNode.name];
    const newPropertyChainStack = root
        ? []
        : astNode.name.includes('Element')
        ? [...propertyChainStack]
        : [...propertyChainStack, astNode.name];

    switch (astNode.name) {
        case 'arrayElement': {
            if (!astNode.arguments) {
                // This arrayElement is edge node
                // Need to check type
                break;
            }
            if (astNode.type === 'array' || astNode.type === 'union') {
                // need more recursive call
                break;
            }
            return astNode.arguments
                .map((node) => {
                    return generateBodyCode({
                        astNode: node,
                        namePrefix,
                        nameStack: [...nameStack],
                        propertyChainStack: [...propertyChainStack],
                    });
                })
                .join('\n');
        }
    }

    switch (astNode.type) {
        // Enum is considered as union
        case 'enum':
        case 'union': {
            // TODO: union with objects should be considered
            const conditions = getConditions({
                astNode,
                nameStack: [...newNameStack],
                namePrefix,
                propertyChainStack: [...newPropertyChainStack],
            });

            const childrenTypes =
                astNode.arguments?.map((node) => node.type).join(' | ') ?? '';

            return [
                `if (${conditions.join(' &&\n')}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: [${wrapQuoteSymbol(childrenTypes)}],`,
                `        received: ${getName({
                    nameStack: [...newNameStack],
                    namePrefix,
                    namePostfix,
                })},`,
                `    });`,
                `}`,
            ].join('\n');
        }
        case 'array': {
            const statement = astNode.arguments?.map((arrayElement) => {
                return generateBodyCode({
                    astNode: arrayElement,
                    namePrefix: 'elem',
                    nameStack: [],
                    propertyChainStack: [...newPropertyChainStack],
                });
            });

            // Check array elems one by one and push to error when error is occurred.
            // But only one error object should be in the error array.
            return [
                `if (!Array.isArray(${getName({
                    nameStack: [...newNameStack],
                    namePrefix,
                    namePostfix,
                })})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: 'array',`,
                `        received: ${getName({
                    nameStack,
                    namePrefix,
                    namePostfix,
                })},`,
                `    });`,
                `} else {`,
                `    ${getName({
                    nameStack: [...newNameStack],
                    namePrefix,
                    namePostfix,
                })}.find((elem) => {`,
                `       const prevErrorLen = error.length;`,
                `       ${statement}`,
                `       return prevErrorLen !== error.length;`,
                `    });`,
                `}`,
            ].join('\n');
        }
        case 'tuple': {
            // [condition, propertyName, expectedType]
            const conditions: [string, string, string][] =
                astNode.arguments?.map((tupleElement, index) => {
                    const condition = getConditions({
                        astNode: tupleElement,
                        nameStack: [...nameStack, `${astNode.name}[${index}]`],
                        propertyChainStack: [
                            ...propertyChainStack,
                            `${astNode.name}[${index}]`,
                        ],
                    });
                    console.log(JSON.stringify(tupleElement, null, 4));
                    return [
                        condition.join(' &&\n'),
                        `${astNode.name}[${index}]`,
                        tupleElement.type,
                    ];
                }) ?? [];

            return [
                `if (!Array.isArray(${getName({
                    nameStack: [...newNameStack],
                    namePrefix,
                    namePostfix,
                })})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: 'tuple',`,
                `        received: ${getName({
                    nameStack,
                    namePrefix,
                    namePostfix,
                })},`,
                `    });`,
                `} else {`,
                `       ${conditions
                    .map(([condition, propertyName, expectedType]) => {
                        return [
                            `if (${condition}) {`,
                            `    error.push({`,
                            `        propertyName: '${propertyName}',`,
                            `        propertyChainTrace: [${wrapQuoteSymbol(
                                propertyChainStack,
                            )}],`,
                            `        expectedType: '${expectedType}',`,
                            `        received: ${getName({
                                nameStack,
                                namePrefix,
                                namePostfix,
                            })},`,
                            `    });`,
                            `}`,
                        ].join('\n');
                    })
                    .join('\n')}`,
                `}`,
            ].join('\n');
        }
        case 'intersection':
        case 'object': {
            const result =
                astNode.arguments?.map((node) =>
                    generateBodyCode({
                        astNode: node,
                        namePrefix,
                        nameStack: [...newNameStack],
                        propertyChainStack: [...newPropertyChainStack],
                    }),
                ) ?? [];

            const objectCondition = [
                `if (${getName({
                    nameStack,
                    namePrefix,
                    namePostfix,
                })} === null ||`,
                `(typeof ${getName({
                    nameStack,
                    namePrefix,
                    namePostfix,
                })} !== "object" &&`,
                `typeof ${getName({
                    nameStack,
                    namePrefix,
                    namePostfix,
                })} !== "function")) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: 'object',`,
                `        received: ${getName({
                    nameStack,
                    namePrefix,
                    namePostfix,
                })},`,
                `    });`,
                `} else {`,
                `    ${result.join('\n')}`,
                `}`,
            ].join('\n');

            return objectCondition;
        }
        default: {
            return [
                `if (${getConditionStatement({
                    astNode,
                    nameStack: [...newNameStack],
                    namePrefix,
                })}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: '${astNode.type}',`,
                `        received: ${getName({
                    nameStack,
                    namePrefix,
                    namePostfix,
                })},`,
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

const getName = ({
    nameStack,
    namePostfix,
    namePrefix,
}: {
    nameStack: string[];
    namePrefix?: string;
    namePostfix?: string;
}) => {
    return namePrefix
        ? `${namePrefix}${propertyChainDot(nameStack)}${namePostfix ?? ''}`
        : `typedValue${propertyChainDot(nameStack)}${namePostfix ?? ''}`;
};

const getConditions = ({
    astNode,
    namePrefix,
    nameStack,
    namePostfix,
    propertyChainStack,
}: GenerateBodyCode): string[] => {
    switch (astNode.type) {
        // Enum is considered as union
        case 'enum':
        case 'union': {
            const unionElements = astNode.arguments;
            if (!unionElements) throw new Error('There is no union elements');
            return unionElements.flatMap((unionElemNode) => {
                return getConditions({
                    astNode: unionElemNode,
                    namePrefix,
                    namePostfix,
                    nameStack: [...nameStack],
                    propertyChainStack: [...propertyChainStack],
                });
            });
        }
        case 'tuple':
        case 'array':
        case 'intersection':
        case 'object': {
            const statement = generateBodyCode({
                astNode,
                namePrefix,
                namePostfix,
                nameStack: [...nameStack],
                propertyChainStack: [...propertyChainStack],
            });
            return [
                [
                    `(() => {`,
                    `    const prevErrorLen = error.length;`,
                    `    ${statement}`,
                    `    return prevErrorLen !== error.length;`,
                    `})()`,
                ].join('\n'),
            ];
        }
        default: {
            return [
                getConditionStatement({
                    astNode,
                    nameStack,
                    namePrefix,
                    namePostfix,
                }),
            ];
        }
    }
};

const getConditionStatement = ({
    astNode,
    nameStack,
    namePrefix,
    namePostfix,
}: {
    astNode: AstNode;
    nameStack: string[];
    namePrefix?: string;
    namePostfix?: string;
}) => {
    if (
        // imported value should not be used with Quote symbols ('').
        // Enum uses imported values.
        astNode.name === 'enumElement' ||
        astNode.type === 'undefined' ||
        astNode.type === 'null'
    ) {
        return `${getName({ nameStack, namePrefix, namePostfix })} !== ${
            astNode.type
        }`;
    }

    if (astNode.type.startsWith(`\"`) || astNode.type.startsWith(`\'`)) {
        return `${getName({ nameStack, namePrefix, namePostfix })} !== ${
            astNode.type
        }`;
    }

    return `typeof ${getName({ nameStack, namePrefix, namePostfix })} !== '${
        astNode.type
    }'`;
};
