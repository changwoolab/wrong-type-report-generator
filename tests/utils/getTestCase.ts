import { Project } from 'ts-morph';
import { getSourceFile } from '.';
import { isTypeDeclaration } from '../../src/types';

export const getTestCase = (caseName: string) => {
    const testProject = new Project({
        tsConfigFilePath: 'tsconfig.json',
    });

    const testSourcefile = getSourceFile(caseName, testProject);

    const exports = Array.from(
        testSourcefile.getExportedDeclarations().values(),
    )
        .flat()
        .filter((ex) => ex.getSourceFile() === testSourcefile);

    const typeDeclarations = exports.filter(isTypeDeclaration);

    return { typeDeclarations, project: testProject };
};
