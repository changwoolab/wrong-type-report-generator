import { transformer } from '../transformer';
import { TypeDeclaration } from '../../types';
import { getTestCase, getTypeDeclaration } from '../../../tests/utils';
import { AstNode, AstRootNode } from '../../reporterAst';
import { getNewRootAst } from '../../reporterAst/astUtils';

describe('transformer - Interface with Primitive type tests', () => {
    const typeDeclarations = getTestCase('InterfaceWithPrimitives');

    test('Interface with Primitive', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'InterfaceWithPrimitives',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expectedResult: AstRootNode = getNewRootAst({
            dependencies: new Map(),
            astNode: {
                name: 'InterfaceWithPrimitives',
                type: 'object',
                arguments: [
                    { name: 'number1', type: 'number' },
                    { name: 'string1', type: 'string' },
                    { name: 'bigint1', type: 'bigint' },
                    { name: 'boolean1', type: 'boolean' },
                    { name: 'undefined1', type: 'undefined' },
                    { name: 'symbol1', type: 'symbol' },
                    { name: 'null1', type: 'null' },

                    // with question mark
                    {
                        name: 'number2',
                        type: 'union',
                        arguments: [
                            {
                                name: 'unionElement',
                                type: 'undefined',
                            },
                            { name: 'unionElement', type: 'number' },
                        ],
                    },
                    {
                        name: 'string2',
                        type: 'union',

                        arguments: [
                            {
                                name: 'unionElement',
                                type: 'undefined',
                            },
                            { name: 'unionElement', type: 'string' },
                        ],
                    },
                    {
                        name: 'bigint2',
                        type: 'union',

                        arguments: [
                            {
                                name: 'unionElement',
                                type: 'undefined',
                            },
                            { name: 'unionElement', type: 'bigint' },
                        ],
                    },
                    {
                        name: 'boolean2',
                        type: 'union',
                        arguments: [
                            {
                                name: 'unionElement',
                                type: 'undefined',
                            },
                            {
                                name: 'unionElement',
                                type: 'boolean',
                            },
                        ],
                    },
                    { name: 'undefined2', type: 'undefined' },
                    {
                        name: 'symbol2',
                        type: 'union',
                        arguments: [
                            {
                                name: 'unionElement',
                                type: 'undefined',
                            },
                            { name: 'unionElement', type: 'symbol' },
                        ],
                    },
                    {
                        name: 'null2',
                        type: 'union',

                        arguments: [
                            { name: 'unionElement', type: 'undefined' },
                            { name: 'unionElement', type: 'null' },
                        ],
                    },
                ],
            },
        });
        expect(newAst).toEqual(expectedResult);
    });

    test('Extended Interface with Primitive', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'ExtendedInterfaceWithPrimitives',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expectedResult: AstRootNode = getNewRootAst({
            dependencies: new Map(),
            astNode: {
                name: 'ExtendedInterfaceWithPrimitives',
                type: 'object',
                arguments: [
                    {
                        name: 'ExtendedInterfaceWithPrimitives',
                        type: 'object',
                        arguments: [
                            { name: 'number1', type: 'number' },
                            { name: 'string1', type: 'string' },
                            { name: 'bigint1', type: 'bigint' },
                            {
                                name: 'boolean1',
                                type: 'boolean',
                            },
                            {
                                name: 'undefined1',
                                type: 'undefined',
                            },
                            { name: 'symbol1', type: 'symbol' },
                            { name: 'null1', type: 'null' },

                            // with question mark
                            {
                                name: 'number2',
                                type: 'union',
                                arguments: [
                                    {
                                        name: 'unionElement',
                                        type: 'undefined',
                                    },
                                    {
                                        name: 'unionElement',
                                        type: 'number',
                                    },
                                ],
                            },
                            {
                                name: 'string2',
                                type: 'union',
                                arguments: [
                                    {
                                        name: 'unionElement',
                                        type: 'undefined',
                                    },
                                    {
                                        name: 'unionElement',
                                        type: 'string',
                                    },
                                ],
                            },
                            {
                                name: 'bigint2',
                                type: 'union',
                                arguments: [
                                    {
                                        name: 'unionElement',
                                        type: 'undefined',
                                    },
                                    {
                                        name: 'unionElement',
                                        type: 'bigint',
                                    },
                                ],
                            },
                            {
                                name: 'boolean2',
                                type: 'union',
                                arguments: [
                                    {
                                        name: 'unionElement',
                                        type: 'undefined',
                                    },
                                    {
                                        name: 'unionElement',
                                        type: 'boolean',
                                    },
                                ],
                            },
                            {
                                name: 'undefined2',
                                type: 'undefined',
                            },
                            {
                                name: 'symbol2',
                                type: 'union',
                                arguments: [
                                    {
                                        name: 'unionElement',
                                        type: 'undefined',
                                    },
                                    {
                                        name: 'unionElement',
                                        type: 'symbol',
                                    },
                                ],
                            },
                            {
                                name: 'null2',
                                type: 'union',
                                arguments: [
                                    {
                                        name: 'unionElement',
                                        type: 'undefined',
                                    },
                                    {
                                        name: 'unionElement',
                                        type: 'null',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'thisisincluded',
                        type: 'number',
                    },
                    {
                        name: 'thisisincluded2',
                        type: 'union',
                        arguments: [
                            {
                                name: 'unionElement',
                                type: 'undefined',
                            },
                            {
                                name: 'unionElement',
                                type: 'number',
                            },
                        ],
                    },
                ],
            },
        });
        expect(newAst).toEqual(expectedResult);
    });

    test('Nested Interface with Primitive', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'NestedInterfaceWithPrimitives',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expectedResult: AstRootNode = getNewRootAst({
            dependencies: new Map(),
            astNode: {
                name: 'NestedInterfaceWithPrimitives',
                type: 'object',
                arguments: [
                    { name: 'number1', type: 'number' },
                    {
                        name: 'nested',
                        type: 'object',
                        arguments: [
                            { name: 'number2', type: 'number' },
                            { name: 'string2', type: 'string' },
                        ],
                    },
                ],
            },
        });
        expect(newAst).toEqual(expectedResult);
    });
});
