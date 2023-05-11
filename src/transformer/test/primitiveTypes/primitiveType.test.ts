import { Project } from 'ts-morph';
import path from 'path';
import { transformer } from '../../transformer';
import { isTypeDeclaration, TypeDeclaration } from '../../../types';

describe('transformer - Primitive type tests', () => {
    const testProject = new Project({
        tsConfigFilePath: 'tsconfig.json',
    });

    const testSourcefile = testProject.getSourceFile(
        'src/transformer/test/primitiveTypes/PrimitiveType.ts',
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

    test('Primitive type: number', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'PrimitiveNumber',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveNumber',
            type: 'number',
            isOptional: false,
        });
    });

    test('Primitive type: string', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'PrimitiveString',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveString',
            type: 'string',
            isOptional: false,
        });
    });

    test('Primitive type: bigint', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'PrimitiveBigint',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveBigint',
            type: 'bigint',
            isOptional: false,
        });
    });

    test('Primitive type: boolean', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'PrimitiveBoolean',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveBoolean',
            type: 'boolean',
            isOptional: false,
        });
    });

    test('Primitive type: undefined', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'PrimitiveUndefined',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveUndefined',
            type: 'undefined',
            isOptional: true,
        });
    });

    test('Primitive type: symbol', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'PrimitiveSymbol',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveSymbol',
            type: 'symbol',
            isOptional: false,
        });
    });

    test('Primitive type: null', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'PrimitiveNull',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveNull',
            type: 'null',
            isOptional: true,
        });
    });
});
