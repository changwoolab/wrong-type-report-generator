import { getTestCase, getTypeDeclaration } from '../../../tests/utils';
import { AstNode, AstRootNode } from '../../reporterAst';
import { getNewAst, getNewRootAst } from '../../reporterAst/astUtils';
import { transformer } from '../transformer';

describe('transformer - Minimum requirements', () => {
    const typeDeclarations = getTestCase('MinimumRequiredTestCase');

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
            astNode: getNewAst({
                name: 'TEST1_COLUMN_WITH_GENERICS',
                type: 'object',
                argument: [
                    getNewAst({
                        name: 'int1',
                        type: 'string',
                    }),
                    getNewAst({
                        name: 'int2',
                        type: 'union',
                        argument: [
                            getNewAst({
                                name: 'unionElement',
                                type: 'null',
                            }),
                            getNewAst({
                                name: 'unionElement',
                                type: 'object',
                                argument: [
                                    getNewAst({
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

    // test('TEST2_ENUMS', () => {
    //     // Given
    //     const typeDeclaration = getTypeDeclaration(
    //         'TEST2_ENUMS',
    //         typeDeclarations,
    //     );

    //     // When
    //     const newAst = transformer(typeDeclaration);
    //     // console.log(JSON.stringify(newAst, null, 4));
    //     // Then
    //     expect(newAst).toEqual(
    //         getNewAst({
    //             name: 'TEST2_ENUMS',
    //             type: 'enum',
    //             argument: [],
    //         }),
    //     );
    // });

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
