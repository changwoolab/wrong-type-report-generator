import { Project } from 'ts-morph';

/**
 * Get file path
 */
export const getAst = (filePath: string, project: Project) => {
    const ast = project.createSourceFile(filePath);

    console.log(ast);
};
