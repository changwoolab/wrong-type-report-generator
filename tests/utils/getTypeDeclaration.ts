import { TypeDeclaration } from '../../src/types';

export const getTypeDeclaration = (
    typeName: string,
    typeDeclarations: TypeDeclaration[],
) => {
    const typeDeclaration = typeDeclarations.find(
        (val) => val.getName() === typeName,
    );

    if (!typeDeclaration) {
        throw new Error(`There is no TypeDeclaration named ${typeName}`);
    }

    return typeDeclaration;
};
