import { AstNode } from '../reporterAst';

export type GenerateBodyCode = {
    astNode: AstNode;
    firstName?: string; // first name of property chain
    nameStack: string[]; // stack for property name -> ${firstName}.${namestack}
    propertyChainStack: string[]; // stack for property chain
    root?: boolean;
};

/**
 * Traverse AST Node and generate code
 */
export const generateBodyCode = ({
    astNode,
    nameStack,
    firstName,
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
                        firstName,
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
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: [${wrapQuoteSymbol(childrenTypes)}],`,
                `        received: ${getName(newNameStack, firstName)},`,
                `    });`,
                `}`,
            ].join('\n');
        }
        case 'array': {
            const statement = astNode.arguments?.map((arrayElement) => {
                return generateBodyCode({
                    astNode: arrayElement,
                    firstName: 'elem',
                    nameStack: [],
                    propertyChainStack: [...newPropertyChainStack],
                });
            });

            // Check array elems one by one and push to error when error is occurred.
            // But only one error object should be in the error array.
            return [
                `if (!Array.isArray(${getName(
                    [...newNameStack],
                    firstName,
                )})) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: 'array',`,
                `        received: ${getName(nameStack, firstName)},`,
                `    });`,
                `} else {`,
                `    ${getName([...newNameStack], firstName)}.find((elem) => {`,
                `       const prevErrorLen = error.length;`,
                `       ${statement}`,
                `       return prevErrorLen !== error.length;`,
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
                    firstName,
                    nameStack: [...newNameStack],
                    propertyChainStack: [...newPropertyChainStack],
                }),
            );

            return result?.join('\n') ?? '';
        }
        default: {
            return [
                `if (${getConditionStatement(
                    astNode,
                    nameStack,
                    firstName,
                )}) {`,
                `    error.push({`,
                `        propertyName: '${astNode.name}',`,
                `        propertyChainTrace: [${wrapQuoteSymbol(
                    propertyChainStack,
                )}],`,
                `        expectedType: '${astNode.type}',`,
                `        received: ${getName(nameStack, firstName)},`,
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

const getName = (nameStack: string[], firstName?: string) => {
    return firstName
        ? `${firstName}${propertyChainDot(nameStack)}`
        : `typedValue${propertyChainDot(nameStack)}`;
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

const getConditionStatement = (
    astNode: AstNode,
    nameStack: string[],
    firstName?: string,
) => {
    if (
        astNode.name === 'enumElement' ||
        astNode.name === 'unionElement' ||
        astNode.type === 'undefined' ||
        astNode.type === 'null'
    ) {
        return `${getName(nameStack, firstName)} !== ${astNode.type}`;
    }

    if (astNode.type.startsWith(`\"`) || astNode.type.startsWith(`\'`)) {
        return `typeof ${getName(nameStack, firstName)} !== ${astNode.type}`;
    }

    return `typeof ${getName(nameStack, firstName)} !== '${astNode.type}'`;
};
