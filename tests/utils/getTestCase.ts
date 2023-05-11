import { Project } from 'ts-morph';
import { isTypeDeclaration } from '../../src/types';

export const getTestCase = (caseName: string) => {
    const testProject = new Project({
        tsConfigFilePath: 'tsconfig.json',
    });

    const testSourcefile = testProject.getSourceFile(
        `tests/cases/${caseName}.ts`,
    );
    if (!testSourcefile) {
        throw new Error('No test sourcefile');
    }

    const exports = Array.from(
        testSourcefile.getExportedDeclarations().values(),
    )
        .flat()
        .filter((ex) => ex.getSourceFile() === testSourcefile);

    const typeDeclarations = exports.filter(isTypeDeclaration);

    return typeDeclarations;
};
