import { Type, Node } from 'ts-morph';
import { ParseNode, parseNode } from './parseNode';
import { AstNode } from '../../reporterAst';
import { getNewAstNode } from '../../reporterAst/astUtils';

export const parseObject = ({ name, type, addToDependencyMap }: ParseNode) => {
    const symbol = type.getSymbol();
    if (!symbol) {
        throw new Error('No Interface Symbols');
    }

    // interface merging이 가능하므로, symbol이 여러개일 수 있다.
    const declarations = symbol.getDeclarations();

    // TODO: interface merge 지원
    const declaration = declarations[0];

    const astNode: AstNode = getNewAstNode({
        name,
        type: 'object',
        argument: [],
    });

    if (type.isInterface()) {
        // interface, properties + methods
        if (!Node.isInterfaceDeclaration(declaration)) {
            throw new TypeError(
                'Extected declaration to be an interface declaration',
            );
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

        // parse index signatures
        const indexSignatures = declaration
            .getIndexSignatures()
            .map((p) => ({ keyType: p.getKeyType(), type: p.getReturnType() }));

        const parsedIndexSignatures = indexSignatures.map((idxSig) => {
            return parseNode({
                name: indexKeyTypeToString(idxSig.keyType),
                type: idxSig.type,
                addToDependencyMap,
            });
        });
        parsedIndexSignatures.forEach((node) => {
            astNode.arguments?.push(node);
        });
    } else {
        // object
        const properties = type.getProperties();
        const typeDeclarations = type.getSymbol()?.getDeclarations();

        const propertySignatures = properties.map((p) => {
            const propertyDeclarations = p.getDeclarations();
            const typeAtLocation =
                propertyDeclarations.length !== 0
                    ? p.getTypeAtLocation(propertyDeclarations[0])
                    : p.getTypeAtLocation((typeDeclarations || [])[0]);
            return {
                name: p.getName(),
                type: typeAtLocation,
            };
        });
        const parsedPropertySignatures = propertySignatures.map((propSig) => {
            return parseNode({
                name: propSig.name,
                type: propSig.type,
                addToDependencyMap,
            });
        });
        parsedPropertySignatures.forEach((node) => {
            astNode.arguments?.push(node);
        });

        const stringIndexType = type.getStringIndexType();
        // TODO

        const numberIndexType = type.getNumberIndexType();
        // TODO
    }

    return astNode;
};

type IndexKeyType = 'string' | 'number' | 'any';
const indexKeyTypeToString = (type: Type): IndexKeyType => {
    switch (true) {
        case type.isString():
            return 'string';
        case type.isNumber():
            return 'number';
        case type.isAny():
            return 'any';
        default:
            throw new Error(
                `Invalid type for index key: ${type.getText()}. Only string or number are expected.`,
            );
    }
};
