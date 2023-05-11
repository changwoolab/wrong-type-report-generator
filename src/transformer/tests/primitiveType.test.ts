import { transformer } from '../transformer';
import { getTestCase } from '../../../tests/utils/getTestCase';
import { getTypeDeclaration } from '../../../tests/utils';
import { AstNode } from '../../reporterAst';

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
        const expectedResult: AstNode = {
            name: 'PrimitiveNumber',
            type: 'number',
        };
        expect(newAst).toEqual(expectedResult);
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
        const expectedResult: AstNode = {
            name: 'PrimitiveString',
            type: 'string',
        };
        expect(newAst).toEqual(expectedResult);
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
        const expectedResult: AstNode = {
            name: 'PrimitiveBigint',
            type: 'bigint',
        };
        expect(newAst).toEqual(expectedResult);
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
        const expectedResult: AstNode = {
            name: 'PrimitiveBoolean',
            type: 'boolean',
        };
        expect(newAst).toEqual(expectedResult);
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
        const expectedResult: AstNode = {
            name: 'PrimitiveUndefined',
            type: 'undefined',
        };
        expect(newAst).toEqual(expectedResult);
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
        const expectedResult: AstNode = {
            name: 'PrimitiveSymbol',
            type: 'symbol',
        };
        expect(newAst).toEqual(expectedResult);
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
        const expectedResult: AstNode = {
            name: 'PrimitiveNull',
            type: 'null',
        };
        expect(newAst).toEqual(expectedResult);
    });
});
