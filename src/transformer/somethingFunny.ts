import { Project } from 'ts-morph';
import { isTypeDeclaration } from '../types';

const main = (filePath: string) => {
    const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
    const sourceFile = project.getSourceFile(filePath);
    if (!sourceFile) {
        throw new Error(`No sourcefile at ${filePath}`);
    }

    const exports = Array.from(sourceFile.getExportedDeclarations().values())
        .flat()
        .filter((ex) => ex.getSourceFile() === sourceFile);

    const typeDeclarations = exports.filter(isTypeDeclaration);

    // console.log(typeDeclarations[1].getType().getBaseTypes()[0].getSymbol()?.getName());
};

main('src/transformer/someTypes.ts');
