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
                                name: 'UnionElement',
                                type: 'null',
                            }),
                            getNewAstNode({
                                name: 'UnionElement',
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
                    name: 'UnionElement',
                    type: 'TEST2_ENUMS.test1',
                }),
                getNewAstNode({
                    name: 'UnionElement',
                    type: 'TEST2_ENUMS.test2',
                }),
                getNewAstNode({
                    name: 'UnionElement',
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
    });

    test('TEST5_GENERICS', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST5_GENERICS',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
    });

    test('TEST6_APPLIED_GENERIC_OBJECTS', () => {
        // Given
        const typeDeclaration = getTypeDeclaration(
            'TEST6_APPLIED_GENERIC_OBJECTS',
            typeDeclarations,
        );

        // When
        const newAst = transformer(typeDeclaration);

        // Then
    });

    // test('INTEGRATED_TEST', () => {
    //     // Given
    //     const typeDeclaration = getTypeDeclaration(
    //         'INTEGRATED_TEST',
    //         typeDeclarations,
    //     );

    //     // When
    //     const newAst = transformer(typeDeclaration);

    //     // Then
    // });
});
