import { getNewAstNode } from '../../reporterAst/astUtils';
import { addTypeToDependencyMap } from '../../utils';
import { ParseNode, parseNode } from './parseNode';
import { Node } from 'ts-morph';

export const parseClass = ({ name, type, addToDependencyMap }: ParseNode) => {
    // add to dependency then use "instanceof" operator when generating code
    addTypeToDependencyMap(type, addToDependencyMap);

    // But when using "instanceof" operator
    // it may not be possible to check the type from axios response
    // So, parse as a interface
    const astNode = getNewAstNode({
        name,
        type: 'class',
        argument: [],
    });

    const symbol = type.getSymbol();
    if (!symbol) {
        throw new Error('No class Symbols');
    }

    // class declaration is only one
    const declaration = symbol.getDeclarations()[0];

    if (!Node.isClassDeclaration(declaration)) {
        throw new TypeError('Expected declaration to be an class declaration');
    }

    // parse base
    const parsedBases = declaration.getBaseTypes().map((baseType) => {
        return parseNode({
            name: type.getSymbol()?.getName() as string,
            type: baseType,
            addToDependencyMap,
        });
    });
    parsedBases.forEach((node) => {
        astNode.arguments?.push(node);
    });

    // parse properties
    const properties = [
        ...declaration.getProperties(),
        ...declaration.getMethods(),
    ].map((p) => ({
        name: p.getSymbol()?.getEscapedName() ?? p.getName(),
        type: p.getType(),
    }));

    const parsedProperties = properties.map((prop) => {
        return parseNode({
            name: prop.name,
            type: prop.type,
            addToDependencyMap,
        });
    });
    parsedProperties.forEach((node) => {
        astNode.arguments?.push(node);
    });

    return astNode;
};
