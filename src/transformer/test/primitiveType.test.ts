import { transformer } from '../transformer';
import { TypeDeclaration } from '../../types';
import { getTestCase } from '../../../tests/utils/getTestCase';

describe('transformer - Primitive type tests', () => {
    const typeDeclarations = getTestCase('PrimitiveType');

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
        });
    });
});
