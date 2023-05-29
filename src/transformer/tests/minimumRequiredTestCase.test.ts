import {
    getSourceFile,
    getTestCase,
    getTypeDeclaration,
} from '../../../tests/utils';
import { AstNode, AstRootNode } from '../../reporterAst';
import { getNewAstNode, getNewRootAst } from '../../reporterAst/astUtils';
import { transformer } from '../transformer';

describe('transformer - Minimum requirements', () => {
    const { typeDeclarations, project } = getTestCase(
        'MinimumRequiredTestCase',
    );

    test('TEST1_COLUMN_WITH_GENERICS', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST1_COLUMN_WITH_GENERICS',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expectedResult: AstRootNode = getNewRootAst({
            dependencies: new Map(),
            astNode: getNewAstNode({
                name: 'TEST1_COLUMN_WITH_GENERICS',
                type: 'object',
                argument: [
                    getNewAstNode({
                        name: 'int1',
                        type: 'string',
                    }),
                    getNewAstNode({
                        name: 'int2',
                        type: 'union',
                        argument: [
                            getNewAstNode({
                                name: 'unionElement',
                                type: 'null',
                            }),
                            getNewAstNode({
                                name: 'unionElement',
                                type: 'object',
                                argument: [
                                    getNewAstNode({
                                        name: 'int3',
                                        type: 'string',
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        });
        expect(expectedResult).toEqual(newAst);
    });

    test('TEST2_ENUMS', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST2_ENUMS',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expectedAstNode: AstNode = getNewAstNode({
            name: 'TEST2_ENUMS',
            type: 'union',
            argument: [
                getNewAstNode({
                    name: 'unionElement',
                    type: 'TEST2_ENUMS.test1',
                }),
                getNewAstNode({
                    name: 'unionElement',
                    type: 'TEST2_ENUMS.test2',
                }),
                getNewAstNode({
                    name: 'unionElement',
                    type: 'TEST2_ENUMS.test3',
                }),
            ],
        });
        const expectedDependencyKey = getSourceFile(
            'minimumRequiredTestCase',
            project,
        );

        expect(newAst.dependencies.has(expectedDependencyKey)).toEqual(true);
        expect(newAst.dependencies.get(expectedDependencyKey)).toEqual({
            TEST2_ENUMS: 'TEST2_ENUMS',
        });
        expect(newAst.ast).toEqual(expectedAstNode);
    });

    // THIS IS NOT SUPPORTED
    // test('TEST3_NAMESPACE', () => {
    //     // Given
    //     const typeDeclaration = getTypeDeclaration(
    //         'TEST3_NAMESPACE',
    //         typeDeclarations,
    //     );

    //     // When
    //     const newAst = transformer(typeDeclaration);

    //     // Then
    // });

    test('TEST4_ARRAY', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST4_ARRAY',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expected = getNewRootAst({
            dependencies: new Map(),
            astNode: getNewAstNode({
                name: 'TEST4_ARRAY',
                type: 'object',
                argument: [
                    getNewAstNode({
                        name: 'test41',
                        type: 'array',
                        argument: [
                            getNewAstNode({
                                name: 'arrayElement',
                                type: 'union',
                                argument: [
                                    getNewAstNode({
                                        name: 'unionElement',
                                        type: '"int1"',
                                    }),
                                    getNewAstNode({
                                        name: 'unionElement',
                                        type: '"int2"',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    getNewAstNode({
                        name: 'test42',
                        type: 'array',
                        argument: [
                            getNewAstNode({
                                name: 'arrayElement',
                                type: 'union',
                                argument: [
                                    getNewAstNode({
                                        name: 'unionElement',
                                        type: '"int1"',
                                    }),
                                    getNewAstNode({
                                        name: 'unionElement',
                                        type: '"int2"',
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        });
        expect(newAst).toEqual(expected);
    });

    test('TEST4_1_ARRAY_WITH_OBJECT', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST4_1_ARRAY_WITH_OBJECT',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expected = getNewRootAst({
            dependencies: new Map(),
            astNode: getNewAstNode({
                name: 'TEST4_1_ARRAY_WITH_OBJECT',
                type: 'array',
                argument: [
                    getNewAstNode({
                        name: 'arrayElement',
                        type: 'object',
                        argument: [
                            getNewAstNode({
                                name: 'int1',
                                type: 'string',
                            }),
                            getNewAstNode({
                                name: 'int2',
                                type: 'union',
                                argument: [
                                    getNewAstNode({
                                        name: 'unionElement',
                                        type: 'null',
                                    }),
                                    getNewAstNode({
                                        name: 'unionElement',
                                        type: 'object',
                                        argument: [
                                            getNewAstNode({
                                                name: 'int3',
                                                type: 'string',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        });
        expect(newAst).toEqual(expected);
    });

    // THIS IS NOT SUPPORTED
    // test('TEST5_GENERICS', () => {
    //     // Given
    //     const typeDeclaration = getTypeDeclaration(
    //         'TEST5_GENERICS',
    //         typeDeclarations,
    //     );

    //     // When
    //     const newAst = transformer(typeDeclaration);
    //     console.log(JSON.stringify(newAst, null, 4));

    //     // Then

    // });

    test('TEST6_APPLIED_GENERIC_OBJECTS', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST6_APPLIED_GENERIC_OBJECTS',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expected: AstRootNode = {
            ast: {
                name: 'TEST6_APPLIED_GENERIC_OBJECTS',
                type: 'object',
                arguments: [
                    {
                        name: 'test1',
                        type: 'object',
                        arguments: [
                            {
                                name: 'test1',
                                type: 'string',
                            },
                            {
                                name: 'test2',
                                type: 'object',
                                arguments: [
                                    {
                                        name: 'test41',
                                        type: 'array',
                                        arguments: [
                                            {
                                                name: 'arrayElement',
                                                type: 'union',
                                                arguments: [
                                                    {
                                                        name: 'unionElement',
                                                        type: '"int1"',
                                                    },
                                                    {
                                                        name: 'unionElement',
                                                        type: '"int2"',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        name: 'test42',
                                        type: 'array',
                                        arguments: [
                                            {
                                                name: 'arrayElement',
                                                type: 'union',
                                                arguments: [
                                                    {
                                                        name: 'unionElement',
                                                        type: '"int1"',
                                                    },
                                                    {
                                                        name: 'unionElement',
                                                        type: '"int2"',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: 'test3',
                                type: 'array',
                                arguments: [
                                    {
                                        name: 'arrayElement',
                                        type: 'object',
                                        arguments: [
                                            {
                                                name: 'test41',
                                                type: 'array',
                                                arguments: [
                                                    {
                                                        name: 'arrayElement',
                                                        type: 'union',
                                                        arguments: [
                                                            {
                                                                name: 'unionElement',
                                                                type: '"int1"',
                                                            },
                                                            {
                                                                name: 'unionElement',
                                                                type: '"int2"',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                name: 'test42',
                                                type: 'array',
                                                arguments: [
                                                    {
                                                        name: 'arrayElement',
                                                        type: 'union',
                                                        arguments: [
                                                            {
                                                                name: 'unionElement',
                                                                type: '"int1"',
                                                            },
                                                            {
                                                                name: 'unionElement',
                                                                type: '"int2"',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'test2',
                        type: 'object',
                        arguments: [
                            {
                                name: 'test1',
                                type: 'string',
                            },
                            {
                                name: 'test2',
                                type: 'object',
                                arguments: [
                                    {
                                        name: 'int1',
                                        type: 'string',
                                    },
                                    {
                                        name: 'int2',
                                        type: 'union',
                                        arguments: [
                                            {
                                                name: 'unionElement',
                                                type: 'null',
                                            },
                                            {
                                                name: 'unionElement',
                                                type: 'object',
                                                arguments: [
                                                    {
                                                        name: 'int3',
                                                        type: 'string',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: 'test3',
                                type: 'array',
                                arguments: [
                                    {
                                        name: 'arrayElement',
                                        type: 'object',
                                        arguments: [
                                            {
                                                name: 'int1',
                                                type: 'string',
                                            },
                                            {
                                                name: 'int2',
                                                type: 'union',
                                                arguments: [
                                                    {
                                                        name: 'unionElement',
                                                        type: 'null',
                                                    },
                                                    {
                                                        name: 'unionElement',
                                                        type: 'object',
                                                        arguments: [
                                                            {
                                                                name: 'int3',
                                                                type: 'string',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            dependencies: new Map(),
        };
    });

    test('TEST7_APPLIED_NAMESPACE', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST7_APPLIED_NAMESPACE',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
    });

    test('TEST8_INTERSECTION', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST8_INTERSECTION',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expected = getNewRootAst({
            dependencies: new Map(),
            astNode: getNewAstNode({
                name: 'TEST8_INTERSECTION',
                type: 'object',
                argument: [
                    getNewAstNode({
                        name: 'test1',
                        type: 'intersection',
                        argument: [
                            getNewAstNode({
                                name: 'intersectionElement',
                                type: 'object',
                                argument: [
                                    getNewAstNode({
                                        name: 'a',
                                        type: 'string',
                                    }),
                                    getNewAstNode({
                                        name: 'b',
                                        type: 'number',
                                    }),
                                    getNewAstNode({
                                        name: 'c',
                                        type: '"asdf"',
                                    }),
                                ],
                            }),

                            getNewAstNode({
                                name: 'intersectionElement',
                                type: 'object',
                                argument: [
                                    getNewAstNode({
                                        name: 'b',
                                        type: 'number',
                                    }),
                                    getNewAstNode({
                                        name: 'c',
                                        type: '"asdf"',
                                    }),
                                    getNewAstNode({
                                        name: 'd',
                                        type: 'object',
                                        argument: [
                                            getNewAstNode({
                                                name: 'e',
                                                type: 'string',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        });
        expect(newAst).toEqual(expected);
    });

    test('TEST9_TUPLE', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST9_TUPLE',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const ExpectedAst = {
            name: 'TEST9_TUPLE',
            type: 'object',
            arguments: [
                {
                    name: 'test1',
                    type: 'tuple',
                    argument: [{ name: 'tupleElement', type: 'number' }],
                },
                {
                    name: 'test2',
                    type: 'tuple',
                    argument: [
                        { name: 'tupleElement', type: 'number' },
                        {
                            name: 'tupleElement',
                            type: 'union',
                            arguments: [
                                {
                                    name: 'unionElement',
                                    type: 'TEST2_ENUMS.test1',
                                },
                                {
                                    name: 'unionElement',
                                    type: 'TEST2_ENUMS.test2',
                                },
                                {
                                    name: 'unionElement',
                                    type: 'TEST2_ENUMS.test3',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const expectedDependencyKey = getSourceFile(
            'minimumRequiredTestCase',
            project,
        );

        expect(newAst.ast).toEqual(ExpectedAst);
        expect(newAst.dependencies.has(expectedDependencyKey)).toEqual(true);
        expect(newAst.dependencies.get(expectedDependencyKey)).toEqual({
            TEST2_ENUMS: 'TEST2_ENUMS',
        });
    });

    test('TEST10_READONLY_ARRAY', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST10_READONLY_ARRAY',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        const expected = {
            ast: {
                name: 'TEST10_READONLY_ARRAY',
                type: 'object',
                arguments: [
                    {
                        name: 'test1',
                        type: 'array',
                        arguments: [
                            {
                                name: 'arrayElement',
                                type: 'number',
                            },
                        ],
                    },
                    {
                        name: 'test2',
                        type: 'array',
                        arguments: [
                            {
                                name: 'arrayElement',
                                type: 'number',
                            },
                        ],
                    },
                    {
                        name: 'test3',
                        type: 'array',
                        arguments: [
                            {
                                name: 'arrayElement',
                                type: 'number',
                            },
                        ],
                    },
                ],
            },
            dependencies: new Map(),
        };
        expect(newAst).toEqual(expected);
    });

    test('INTEGRATED_TEST', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'INTEGRATED_TEST',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
    });
});
