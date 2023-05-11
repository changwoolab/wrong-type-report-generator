import { transformer } from '../transformer';
import { TypeDeclaration } from '../../types';
import { getTestCase } from '../../../tests/utils/getTestCase';
import { getTypeDeclaration } from '../../../tests/utils';

describe('transformer - Primitive type tests', () => {
    const typeDeclarations = getTestCase('PrimitiveType');

    test('Primitive type: number', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveNumber',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveNumber',
            type: 'number',
        });
    });

    test('Primitive type: string', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveString',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveString',
            type: 'string',
        });
    });

    test('Primitive type: bigint', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveBigint',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveBigint',
            type: 'bigint',
        });
    });

    test('Primitive type: boolean', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveBoolean',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveBoolean',
            type: 'boolean',
        });
    });

    test('Primitive type: undefined', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveUndefined',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveUndefined',
            type: 'undefined',
        });
    });

    test('Primitive type: symbol', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveSymbol',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveSymbol',
            type: 'symbol',
        });
    });

    test('Primitive type: null', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'PrimitiveNull',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'PrimitiveNull',
            type: 'null',
        });
    });
});
