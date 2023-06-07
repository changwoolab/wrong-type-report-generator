import {
    getSourceFile,
    getTestCase,
    getTypeDeclaration,
} from '../../../tests/utils';
import { AstRootNode } from '../../reporterAst';
import { getNewRootAst, getNewAstNode } from '../../reporterAst/astUtils';
import { transformer } from '../../transformer/transformer';
import { codeGenerator } from '../codeGenerator';

describe('transformer - imports', () => {
    const { typeDeclarations, project } = getTestCase(
        'MinimumRequiredTestCase',
    );

    test('', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST1_COLUMN_WITH_GENERICS',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('TEST2_ENUMS', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST2_ENUMS',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf2.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
    test('TEST4_ARRAY', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST4_ARRAY',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf4.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
    test('TEST6_APPLIED_GENERIC_OBJECTS', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST6_APPLIED_GENERIC_OBJECTS',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf6.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
    test('TEST7_APPLIED_NAMESPACE', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST7_APPLIED_NAMESPACE',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf7.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
    test('TEST8_INTERSECTION', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST8_INTERSECTION',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf8.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
    test('TEST9_TUPLE', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST9_TUPLE',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf9.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
    test('TEST10_READONLY_ARRAY', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST10_READONLY_ARRAY',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf10.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
    test('TEST11_CLASS', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST11_CLASS',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        const newCode = await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/asdf11.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
});
