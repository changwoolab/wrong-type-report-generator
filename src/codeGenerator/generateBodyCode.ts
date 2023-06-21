import { AstNode } from '../reporterAst';
import { getName, getNewStack, wrapQuoteSymbol } from './utils';

export type GenerateBodyCode = {
    astNode: AstNode;
    namePrefix?: string; // prefix of property chain
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
    propertyChainStack,
    root,
}: GenerateBodyCode): string => {
    const copiedNameStack = [...nameStack];
    const newNameStack = getNewStack(copiedNameStack, astNode.name, root);

    const copiedPropertyChainStack = [...propertyChainStack];
    const newPropertyChainStack = getNewStack(copiedPropertyChainStack, astNode.name, root);

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
                        nameStack: copiedNameStack,
                        propertyChainStack: copiedPropertyChainStack,
                    });
                })
                .join('\n');
        }
    }

    switch (astNode.type) {
        // Enum is considered as union
        case 'enum':
        case 'union': {
            const conditions = getConditions({
                astNode,
                nameStack: newNameStack,
                namePrefix,
                propertyChainStack: newPropertyChainStack,
            });

            const childrenTypes =
                astNode.arguments
                    ?.map((node) => {
                        if (
                            !(astNode.type.includes('"') || astNode.type.includes("'")) &&
                            astNode.type === 'object'
                        ) {
                            return node.name;
                        }
                        return node.type;
                    })
                    .join(' | ') ?? '';

            return [
                `if (${conditions.join(' &&\n')}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(copiedPropertyChainStack)}],`,
                `        expectedType: ${wrapQuoteSymbol(childrenTypes)},`,
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
                    propertyChainStack: newPropertyChainStack,
                });
            });

            // Check array elems one by one and push to error when error is occurred.
            // But only one error object should be in the error array.
            return [
                `if (!Array.isArray(${getName(newNameStack, namePrefix)})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(copiedPropertyChainStack)}],`,
                `        expectedType: 'array',`,
                `        received: ${getName(copiedNameStack, namePrefix)},`,
                `    });`,
                `} else {`,
                `    ${getName(newNameStack, namePrefix)}.find((elem) => {`,
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
                        nameStack: [...copiedNameStack, astNode.name, `${index}`],
                        propertyChainStack: [
                            ...copiedPropertyChainStack,
                            `${astNode.name}[${index}]`,
                        ],
                    });
                    return [
                        condition.join(' &&\n'),
                        `${astNode.name}[${index}]`,
                        tupleElement.type,
                    ];
                }) ?? [];

            return [
                `if (!Array.isArray(${getName(newNameStack, namePrefix)})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(copiedPropertyChainStack)}],`,
                `        expectedType: 'tuple',`,
                `        received: ${getName(copiedNameStack, namePrefix)},`,
                `    });`,
                `} else {`,
                `       ${conditions
                    .map(([condition, propertyName, expectedType]) => {
                        return [
                            `if (${condition}) {`,
                            `    error.push({`,
                            `        propertyName: '${propertyName}',`,
                            `        propertyChainTrace: [${wrapQuoteSymbol(
                                copiedPropertyChainStack,
                            )}],`,
                            `        expectedType: '${expectedType}',`,
                            `        received: ${getName(newNameStack, namePrefix)},`,
                            `    });`,
                            `}`,
                        ].join('\n');
                    })
                    .join('\n')}`,
                `}`,
            ].join('\n');
        }
        case 'class': {
            // class condition has only one condition
            const [classCondition] = getConditions({
                astNode,
                nameStack: newNameStack,
                namePrefix,
                propertyChainStack: newPropertyChainStack,
            });

            return [
                `if (${classCondition}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(copiedPropertyChainStack)}],`,
                `        expectedType: '${astNode.name}',`,
                `        received: ${getName(copiedNameStack, namePrefix)},`,
                `    });`,
                `}`,
            ].join('\n');
        }
        // TODO: remove duplicated property error in intersection
        case 'intersection':
        case 'object': {
            const result =
                astNode.arguments?.map((node) =>
                    generateBodyCode({
                        astNode: node,
                        namePrefix,
                        nameStack: newNameStack,
                        propertyChainStack: newPropertyChainStack,
                    }),
                ) ?? [];

            const objectCondition = [
                `if (${getName(copiedNameStack, namePrefix)} == null ||`,
                `(typeof ${getName(copiedNameStack, namePrefix)} !== "object" &&`,
                `typeof ${getName(copiedNameStack, namePrefix)} !== "function")) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(copiedPropertyChainStack)}],`,
                `        expectedType: 'object',`,
                `        received: ${getName(copiedNameStack, namePrefix)},`,
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
                    nameStack: newNameStack,
                    namePrefix,
                })}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(copiedPropertyChainStack)}],`,
                `        expectedType: '${astNode.type}',`,
                `        received: ${getName(newNameStack, namePrefix)},`,
                `    });`,
                `}`,
            ].join('\n');
        }
    }
};

const getConditions = ({
    astNode,
    namePrefix,
    nameStack,
    propertyChainStack,
}: GenerateBodyCode): string[] => {
    const copiedNameStack = [...nameStack];
    const copiedPropertyChainStack = [...propertyChainStack];

    switch (astNode.type) {
        // Enum is considered as union
        case 'enum':
        case 'union': {
            const unionElements = astNode.arguments;
            if (!unionElements) throw new Error('There is no union elements');

            const objectElements = unionElements.filter((unionElem) => unionElem.type === 'object');
            const nonObjectElements = unionElements.filter(
                (unionElem) => unionElem.type !== 'object',
            );

            const objectConditions = objectElements.flatMap((objectElem) => {
                return getConditions({
                    astNode: objectElem,
                    namePrefix,
                    nameStack: copiedNameStack,
                    propertyChainStack: copiedPropertyChainStack,
                });
            });
            const objectCondition = [
                `(() => {`,
                `    const error: GeneratedWrongTypeErrorReport = [];`,
                `    let errorCnt = 0;`,
                `    ${objectConditions
                    .map((objCondition) => {
                        return [`if (${objCondition}) {`, `    errorCnt++;`, `}`].join('\n');
                    })
                    .join(';\n')}`,
                `    return errorCnt === ${objectConditions.length};`,
                `})()`,
            ].join('\n');

            const unionConditions = nonObjectElements.flatMap((unionElemNode) => {
                return getConditions({
                    astNode: unionElemNode,
                    namePrefix,
                    nameStack: copiedNameStack,
                    propertyChainStack: copiedPropertyChainStack,
                });
            });
            if (objectConditions.length > 0) {
                unionConditions.unshift(objectCondition);
            }

            return unionConditions;
        }
        case 'class': {
            return [
                `!(${getName(nameStack, namePrefix)} instanceof ${astNode.arguments![0].type})`,
            ];
        }
        case 'tuple':
        case 'array':
        case 'intersection':
        case 'object': {
            // TODO: optimization
            const statement = generateBodyCode({
                astNode,
                namePrefix,
                nameStack: copiedNameStack,
                propertyChainStack: copiedPropertyChainStack,
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
                }),
            ];
        }
    }
};

const getConditionStatement = ({
    astNode,
    nameStack,
    namePrefix,
}: {
    astNode: AstNode;
    nameStack: string[];
    namePrefix?: string;
}) => {
    if (
        // imported value should not be used with Quote symbols ('').
        // Enum uses imported values.
        astNode.name === 'enumElement' ||
        astNode.type === 'undefined' ||
        astNode.type === 'null'
    ) {
        return `${getName(nameStack, namePrefix)} !== ${astNode.type}`;
    }

    const primitives = ['string', 'number', 'bigint', 'boolean', 'symbol', 'undefined', 'null'];
    if (primitives.includes(astNode.type)) {
        return `typeof ${getName(nameStack, namePrefix)} !== '${astNode.type}'`;
    }

    const untyped = ['any', 'unknown'];
    if (untyped.includes(astNode.type)) {
        return `false`;
    }

    /** reject by default */
    return `true`;
};
