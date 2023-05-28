import {
    getSourceFile,
    getTestCase,
    getTypeDeclaration,
} from '../../../tests/utils';
import { AstRootNode } from '../../reporterAst';
import { getNewRootAst, getNewAstNode } from '../../reporterAst/astUtils';
import { transformer } from '../transformer';

describe('transformer - imports', () => {
    const { typeDeclarations, project } = getTestCase('import/importTestCase');

    test('Enum should be imported properly', () => {
        // Given
        const typeDeclaration = getTypeDeclaration('Test', typeDeclarations);

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expectedAstNode = getNewAstNode({
            name: 'Test',
            type: 'object',
            argument: [
                getNewAstNode({
                    name: 'type',
                    type: 'union',
                    argument: [
                        getNewAstNode({
                            name: 'unionElement',
                            type: 'TestType.t',
                        }),
                        getNewAstNode({
                            name: 'unionElement',
                            type: 'TestType.a',
                        }),
                        getNewAstNode({
                            name: 'unionElement',
                            type: 'TestType.b',
                        }),
                    ],
                }),
            ],
        });
        const expectedSourceFile = getSourceFile(
            'import/toBeImported',
            project,
        );

        expect(newAst.ast).toEqual(expectedAstNode);
        expect(newAst.dependencies.has(expectedSourceFile)).toEqual(true);
        expect(newAst.dependencies.get(expectedSourceFile)).toEqual({
            TestType: 'TestType',
        });
    });
});
