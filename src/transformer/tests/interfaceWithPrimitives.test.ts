import { transformer } from '../transformer';
import { TypeDeclaration } from '../../types';
import { getTestCase, getTypeDeclaration } from '../../../tests/utils';
import { AstNode } from '../types';

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
        const expectedResult: AstNode = {
            name: 'InterfaceWithPrimitives',
            type: 'InterfaceWithPrimitives',
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
                            name: 'number2',
                            type: 'undefined',
                        },
                        { name: 'number2', type: 'number' },
                    ],
                },
                {
                    name: 'string2',
                    type: 'union',

                    arguments: [
                        {
                            name: 'string2',
                            type: 'undefined',
                        },
                        { name: 'string2', type: 'string' },
                    ],
                },
                {
                    name: 'bigint2',
                    type: 'union',

                    arguments: [
                        {
                            name: 'bigint2',
                            type: 'undefined',
                        },
                        { name: 'bigint2', type: 'bigint' },
                    ],
                },
                {
                    name: 'boolean2',
                    type: 'union',

                    arguments: [
                        {
                            name: 'boolean2',
                            type: 'undefined',
                        },
                        // Oh.. after using `~~?: boolean`,
                        // it is converted into "undefined | true | false" rather than "undefined | boolean"
                        {
                            name: 'boolean2',
                            type: 'false',
                        },
                        {
                            name: 'boolean2',
                            type: 'true',
                        },
                    ],
                },
                { name: 'undefined2', type: 'undefined' },
                {
                    name: 'symbol2',
                    type: 'union',

                    arguments: [
                        {
                            name: 'symbol2',
                            type: 'undefined',
                        },
                        { name: 'symbol2', type: 'symbol' },
                    ],
                },
                {
                    name: 'null2',
                    type: 'union',

                    arguments: [
                        { name: 'null2', type: 'undefined' },
                        { name: 'null2', type: 'null' },
                    ],
                },
            ],
        };
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
        const expectedResult: AstNode = {
            name: 'ExtendedInterfaceWithPrimitives',
            type: 'ExtendedInterfaceWithPrimitives',
            arguments: [
                {
                    name: 'ExtendedInterfaceWithPrimitives',
                    type: 'InterfaceWithPrimitives',

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
                                    name: 'number2',
                                    type: 'undefined',
                                },
                                {
                                    name: 'number2',
                                    type: 'number',
                                },
                            ],
                        },
                        {
                            name: 'string2',
                            type: 'union',

                            arguments: [
                                {
                                    name: 'string2',
                                    type: 'undefined',
                                },
                                {
                                    name: 'string2',
                                    type: 'string',
                                },
                            ],
                        },
                        {
                            name: 'bigint2',
                            type: 'union',

                            arguments: [
                                {
                                    name: 'bigint2',
                                    type: 'undefined',
                                },
                                {
                                    name: 'bigint2',
                                    type: 'bigint',
                                },
                            ],
                        },
                        {
                            name: 'boolean2',
                            type: 'union',

                            arguments: [
                                {
                                    name: 'boolean2',
                                    type: 'undefined',
                                },
                                // Oh.. after using `~~?: boolean`,
                                // it is converted into "undefined | true | false" rather than "undefined | boolean"
                                {
                                    name: 'boolean2',
                                    type: 'false',
                                },
                                {
                                    name: 'boolean2',
                                    type: 'true',
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
                                    name: 'symbol2',
                                    type: 'undefined',
                                },
                                {
                                    name: 'symbol2',
                                    type: 'symbol',
                                },
                            ],
                        },
                        {
                            name: 'null2',
                            type: 'union',

                            arguments: [
                                {
                                    name: 'null2',
                                    type: 'undefined',
                                },
                                {
                                    name: 'null2',
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
                            name: 'thisisincluded2',
                            type: 'undefined',
                        },
                        {
                            name: 'thisisincluded2',
                            type: 'number',
                        },
                    ],
                },
            ],
        };
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
        const expectedResult: AstNode = {
            name: 'NestedInterfaceWithPrimitives',
            type: 'NestedInterfaceWithPrimitives',
            arguments: [
                { name: 'number1', type: 'number' },
                {
                    name: 'nested',
                    type: '__type', // WTF?
                    arguments: [
                        { name: 'number2', type: 'number' },
                        { name: 'string2', type: 'string' },
                    ],
                },
            ],
        };
        expect(newAst).toEqual(expectedResult);
    });
});
