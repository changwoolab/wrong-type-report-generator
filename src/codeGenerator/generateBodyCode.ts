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
                `        received: ${getName(newNameStack, namePrefix)},`,
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
                `if (!Array.isArray(${getName(
                    [...newNameStack],
                    namePrefix,
                )})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: 'array',`,
                `        received: ${getName(nameStack, namePrefix)},`,
                `    });`,
                `} else {`,
                `    ${getName(
                    [...newNameStack],
                    namePrefix,
                )}.find((elem) => {`,
                `       const prevErrorLen = error.length;`,
                `       ${statement}`,
                `       return prevErrorLen !== error.length;`,
                `    });`,
                `}`,
            ].join('\n');
        }
        case 'tuple': {
            // TODO
            const tupleLength = astNode.arguments?.length ?? 0;
            // const conditions = Array(tupleLength).map((_, index) => {
            //     return [`if (${getName([...newNameStack], namePrefix)}[${index}] !== ${}) {`]
            // });

            return [
                `if (!Array.isArray(${getName(
                    [...newNameStack],
                    namePrefix,
                )})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: 'tuple',`,
                `        received: ${getName(nameStack, namePrefix)},`,
                `    });`,
                `} else {`,
                `    ${getName(
                    [...newNameStack],
                    namePrefix,
                )}.find((elem) => {`,
                `       const prevErrorLen = error.length;`,
                `       ${astNode.arguments
                    ?.map((node, index) => {
                        return generateBodyCode({
                            astNode: node,
                            namePrefix: `elem[${index}]`,
                            nameStack: [],
                            propertyChainStack: [...newPropertyChainStack],
                        });
                    })
                    .join('\n')}`,
                `       return prevErrorLen !== error.length;`,
                `    });`,
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
                `if (${getName(nameStack, namePrefix)} === null ||`,
                `(typeof ${getName(nameStack, namePrefix)} !== "object" &&`,
                `typeof ${getName(nameStack, namePrefix)} !== "function")) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: 'object',`,
                `        received: ${getName(nameStack, namePrefix)},`,
                `    });`,
                `} else {`,
                `    ${result.join('\n')}`,
                `}`,
            ].join('\n');

            return objectCondition;
        }
        default: {
            return [
                `if (${getConditionStatement(
                    astNode,
                    [...newNameStack],
                    namePrefix,
                )}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: '${astNode.type}',`,
                `        received: ${getName(nameStack, namePrefix)},`,
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

const getName = (nameStack: string[], namePrefix?: string) => {
    return namePrefix
        ? `${namePrefix}${propertyChainDot(nameStack)}`
        : `typedValue${propertyChainDot(nameStack)}`;
};

const getConditions = ({
    astNode,
    namePrefix,
    nameStack,
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
                    nameStack: [...nameStack],
                    propertyChainStack: [...propertyChainStack],
                });
            });
        }
        case 'array': {
            const statement = generateBodyCode({
                astNode,
                namePrefix,
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
        case 'tuple': {
            // TODO
            return astNode.arguments!.flatMap((node, index) => {
                return getConditions({
                    astNode: node,
                    namePrefix: `elem[${index}]`,
                    nameStack: [...nameStack],
                    propertyChainStack: [...propertyChainStack],
                });
            });
        }
        case 'intersection':
        case 'object': {
            return astNode.arguments!.flatMap((node) =>
                getConditions({
                    astNode: node,
                    namePrefix,
                    nameStack: [...nameStack],
                    propertyChainStack: [...propertyChainStack],
                }),
            );
        }
        default: {
            return [getConditionStatement(astNode, nameStack, namePrefix)];
        }
    }
};

const getConditionStatement = (
    astNode: AstNode,
    nameStack: string[],
    namePrefix?: string,
) => {
    if (
        // imported value should not be used with Quote symbols ('').
        // Enum uses imported values.
        astNode.name === 'enumElement' ||
        astNode.type === 'undefined' ||
        astNode.type === 'null'
    ) {
        return `${getName(nameStack, namePrefix)} !== ${astNode.type}`;
    }

    if (astNode.type.startsWith(`\"`) || astNode.type.startsWith(`\'`)) {
        return `${getName(nameStack, namePrefix)} !== ${astNode.type}`;
    }

    return `typeof ${getName(nameStack, namePrefix)} !== '${astNode.type}'`;
};
