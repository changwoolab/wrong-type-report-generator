import {
    getTestCase,
    getTypeDeclaration,
    getSourceFile,
} from '../../../tests/utils';
import { transformer } from '../../transformer/transformer';
import { codeGenerator } from '../codeGenerator';

describe('mini test', () => {
    const { typeDeclarations, project } = getTestCase('mini/miniTest');

    test('OneObject', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'OneObject',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/miniTestResults/OneObject.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('WithGenerics', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'WithGenerics',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/WithGenerics.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('Enums', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration('Enums', typeDeclarations);
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/miniTestResults/Enums.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('NameSpace', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'NameSpace',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/miniTestResults/NameSpace.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('PrimitiveOneArray', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveOneArray',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/PrimitiveOneArray.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('PrimitiveArrays', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveArrays',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/PrimitiveArrays.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('PrimitiveOneArrayWithObject', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveOneArrayWithObject',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/PrimitiveOneArrayWithObject.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('PrimitiveArraysWithObject', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveArraysWithObject',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/PrimitiveArraysWithObject.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('OneArray', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'OneArray',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/miniTestResults/OneArray.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('Arrays', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration('Arrays', typeDeclarations);
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/miniTestResults/Arrays.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('OneArrayWithObject', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'OneArrayWithObject',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/OneArrayWithObject.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('ArraysWithObject', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'ArraysWithObject',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/ArraysWithObject.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('PrimitiveUnion', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveUnion',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/PrimitiveUnion.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('PrimitiveUnionWithObject', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveUnionWithObject',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/PrimitiveUnionWithObject.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('Union', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration('Union', typeDeclarations);
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/miniTestResults/Union.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('UnionWithObject', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'UnionWithObject',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/UnionWithObject.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('PrimitiveIntersection', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveIntersection',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/PrimitiveIntersection.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('Intersection', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'Intersection',
            typeDeclarations,
        );
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath:
                'src/codeGenerator/tests/miniTestResults/Intersection.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });

    test('Tuple', async () => {
        // Given
        const typeDeclaration = getTypeDeclaration('Tuple', typeDeclarations);
        const newAst = transformer(typeDeclaration);

        // When
        await codeGenerator({
            astRootNode: newAst,
            project,
            outFilePath: 'src/codeGenerator/tests/miniTestResults/Tuple.ts',
            inputSourceFile: getSourceFile('import/toBeImported', project),
        });

        // Then
    });
});
