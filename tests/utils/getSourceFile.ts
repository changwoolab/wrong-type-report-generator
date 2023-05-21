import { Project } from 'ts-morph';

export const getSourceFile = (caseName: string, project: Project) => {
    const sourceFile = project.getSourceFile(`tests/cases/${caseName}.ts`);

    if (!sourceFile) {
        throw new Error('No test sourcefile');
    }

    return sourceFile;
};
