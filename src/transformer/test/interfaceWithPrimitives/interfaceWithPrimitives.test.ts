import { Project } from 'ts-morph';
import path from 'path';
import { transformer } from '../../transformer';
import { isTypeDeclaration, TypeDeclaration } from '../../../types';

describe('transformer - Interface with Primitive type tests', () => {
    const testProject = new Project({
        tsConfigFilePath: 'tsconfig.json',
    });

    const testSourcefile = testProject.getSourceFile(
        'testCases/InterfaceWithPrimitives.ts',
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

    test('Interface with Primitive', () => {
        // Given
        const typeDeclaration = typeDeclarations.find(
            (val) => val.getName() === 'InterfaceWithPrimitives',
        ) as TypeDeclaration;

        // When
        const newAst = transformer(typeDeclaration);

        // Then
        expect(newAst).toEqual({
            name: 'InterfaceWithPrimitives',
            type: 'InterfaceWithPrimitives',
            isOptional: false,
            arguments: [
                { name: 'number1', type: 'number', isOptional: false },
                { name: 'string1', type: 'string', isOptional: false },
                { name: 'bigint1', type: 'bigint', isOptional: false },
                { name: 'boolean1', type: 'boolean', isOptional: false },
                { name: 'undefined1', type: 'undefined', isOptional: true },
                { name: 'symbol1', type: 'symbol', isOptional: false },
                { name: 'null1', type: 'null', isOptional: true },

                // with question mark
                {
                    name: 'number2',
                    type: 'union',
                    isOptional: true,
                    arguments: [
                        {
                            name: 'number2',
                            type: 'undefined',
                            isOptional: true,
                        },
                        { name: 'number2', type: 'number', isOptional: false },
                    ],
                },
                {
                    name: 'string2',
                    type: 'union',
                    isOptional: true,
                    arguments: [
                        {
                            name: 'string2',
                            type: 'undefined',
                            isOptional: true,
                        },
                        { name: 'string2', type: 'string', isOptional: false },
                    ],
                },
                {
                    name: 'bigint2',
                    type: 'union',
                    isOptional: true,
                    arguments: [
                        {
                            name: 'bigint2',
                            type: 'undefined',
                            isOptional: true,
                        },
                        { name: 'bigint2', type: 'bigint', isOptional: false },
                    ],
                },
                {
                    name: 'boolean2',
                    type: 'union',
                    isOptional: true,
                    arguments: [
                        {
                            name: 'boolean2',
                            type: 'undefined',
                            isOptional: true,
                        },
                        // Oh.. after using `~~?: boolean`,
                        // it is converted into "undefined | true | false" rather than "undefined | boolean"
                        {
                            name: 'boolean2',
                            type: 'false',
                            isOptional: false,
                        },
                        {
                            name: 'boolean2',
                            type: 'true',
                            isOptional: false,
                        },
                    ],
                },
                { name: 'undefined2', type: 'undefined', isOptional: true },
                {
                    name: 'symbol2',
                    type: 'union',
                    isOptional: true,
                    arguments: [
                        {
                            name: 'symbol2',
                            type: 'undefined',
                            isOptional: true,
                        },
                        { name: 'symbol2', type: 'symbol', isOptional: false },
                    ],
                },
                {
                    name: 'null2',
                    type: 'union',
                    isOptional: true,
                    arguments: [
                        { name: 'null2', type: 'undefined', isOptional: true },
                        { name: 'null2', type: 'null', isOptional: true },
                    ],
                },
            ],
        });
    });
});
