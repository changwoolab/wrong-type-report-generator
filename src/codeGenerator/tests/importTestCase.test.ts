import {
    getSourceFile,
    getTestCase,
    getTypeDeclaration,
} from '../../../tests/utils';
import { AstRootNode } from '../../reporterAst';
import { getNewRootAst, getNewAstNode } from '../../reporterAst/astUtils';
import { codeGenerator } from '../codeGenerator';

describe('transformer - imports', () => {
    const { typeDeclarations, project } = getTestCase('import/importTestCase');

    test('Enum should be imported properly', async () => {
        // Given
        const sourceFile = getSourceFile('import/toBeImported', project);
        const astRootNode = getNewRootAst({
            astNode: getNewAstNode({
                name: 'Test',
                type: 'object',
                argument: [
                    getNewAstNode({
                        name: 'type',
                        type: 'union',
                        argument: [
                            getNewAstNode({
                                name: 'enumElement',
                                type: 'TestType.t',
                            }),
                            getNewAstNode({
                                name: 'enumElement',
                                type: 'TestType.a',
                            }),
                            getNewAstNode({
                                name: 'enumElement',
                                type: 'TestType.b',
                            }),
                        ],
                    }),
                ],
            }),
            dependencies: new Map([[sourceFile, { TestType: 'TestType' }]]),
        });
        // When
        await codeGenerator({
            astRootNode,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf.ts',
            inputSourceFile: sourceFile,
        });

        // Then
    });
});
