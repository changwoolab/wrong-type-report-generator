import { ExportableNode, SourceFile, Type, Node } from 'ts-morph';
import { Dependencies } from './reporterAst';

export type AddDependency = {
    sourceFile: SourceFile;
    exportName: string;
    isDefault: boolean;
};

export type AddToDependencyMap = (toAdd: AddDependency) => void;

const findExportableNode = (type: Type): (ExportableNode & Node) | null => {
    const symbol = type.getSymbol();
    if (symbol === undefined) {
        return null;
    }

    return (
        symbol
            .getDeclarations()
            .reduce<Node[]>(
                (acc, node) => [...acc, node, ...node.getAncestors()],
                [],
            )
            .filter(Node.isExportable)
            .find((n) => n.isExported()) || null
    );
};

export const addTypeToDependencyMap = (
    type: Type,
    addToDependencyMap: AddToDependencyMap,
): void => {
    const exportable = findExportableNode(type);
    if (exportable === null) {
        return;
    }

    const sourceFile = exportable.getSourceFile();
    const name = exportable.getSymbol()!.getName();
    const isDefault = exportable.isDefaultExport();

    if (!exportable.isExported()) {
        reportError(`${name} is not exported from ${sourceFile.getFilePath()}`);
    }

    addToDependencyMap({ sourceFile, exportName: name, isDefault });
};

export const createAddToDependencyMap = () => {
    const dependencies: Dependencies = new Map();

    return {
        addToDependencyMap: (toAdd: AddDependency) => {
            const { sourceFile, exportName, isDefault } = { ...toAdd };

            const alias = exportName;
            const name = isDefault ? 'default' : exportName;

            let imports = dependencies.get(sourceFile);
            if (imports === undefined) {
                imports = {};
                dependencies.set(sourceFile, imports);
            }

            const previousAlias = imports[name];
            if (previousAlias !== undefined && previousAlias !== alias) {
                reportError(
                    `Conflicting export alias for "${sourceFile.getFilePath()}": "${alias}" vs "${previousAlias}"`,
                );
            }

            imports[name] = alias;
        },
        getDependencyMap: () => {
            return dependencies;
        },
    };
};

export const makeAsync = async () => {
    return new Promise((resolve) => setTimeout(resolve, 0));
};
