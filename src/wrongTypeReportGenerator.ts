import { Project, SourceFile } from 'ts-morph';
import { transformer } from './transformer/transformer';
import { isTypeDeclaration, TypeDeclaration } from './types';
import { codeGenerator } from './codeGenerator/codeGenerator';
import path from 'path';

export const generateOneWrongTypeReport = async ({
    filePath,
    project,
    outDirPath,
    onlyExport,
}: {
    filePath: string;
    project: Project;
    outDirPath?: string;
    onlyExport?: boolean;
}) => {
    if (!outDirPath) {
        outDirPath = path.dirname(filePath);
    }

    const sourceFile = project.getSourceFile(filePath);
    if (!sourceFile) {
        throw new Error(`No sourcefile at ${filePath}`);
    }

    const exports = Array.from(sourceFile.getExportedDeclarations().values())
        .flat()
        .filter((ex) => ex.getSourceFile() === sourceFile);

    const exportedTypeDeclarations = exports.filter(isTypeDeclaration);

    // Get all type declarations
    const typesDeclarations: TypeDeclaration[] = onlyExport
        ? exportedTypeDeclarations
        : [
              ...sourceFile.getInterfaces(),
              ...sourceFile.getTypeAliases(),
              ...sourceFile.getEnums(),
          ];

    // Get new AST
    const newAsts = typesDeclarations.map((typeDeclaration) => {
        return transformer(typeDeclaration);
    });

    // Generate guard then add to SourceFile
    await Promise.all(
        newAsts.map((ast) => {
            return codeGenerator({
                astRootNode: ast,
                project,
                outFilePath: `${outDirPath}/${ast.ast.name}.guard.ts`,
                inputSourceFile: sourceFile,
            });
        }),
    );
};

export const generateWrongTypeReport = async ({
    filePaths,
    project,
    outDirPath,
    onlyExport,
}: {
    filePaths: string[];
    project: Project;
    outDirPath?: string;
    onlyExport?: boolean;
}) => {
    await Promise.all(
        filePaths.map((filePath) => {
            return generateOneWrongTypeReport({
                filePath,
                project,
                outDirPath,
                onlyExport,
            });
        }),
    );
};

generateOneWrongTypeReport({
    filePath: path.resolve('tests/cases/mini/miniTest.ts'),
    project: new Project({ tsConfigFilePath: 'tsconfig.json' }),
});
