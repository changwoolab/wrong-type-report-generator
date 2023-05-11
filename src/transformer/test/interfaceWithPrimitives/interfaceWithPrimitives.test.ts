import { Project } from 'ts-morph';
import path from 'path';
import { transformer } from '../../transformer';
import { isTypeDeclaration, TypeDeclaration } from '../../../types';

describe('transformer - Interface with Primitive type tests', () => {
    const testProject = new Project({
        tsConfigFilePath: 'tsconfig.json',
    });

    const testSourcefile = testProject.getSourceFile(
        'src/transformer/test/interfaceWithPrimitives/InterfaceWithPrimitives.ts',
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
                { name: 'null1', type: 'null', isOptional: false },
            ],
        });
    });
});
