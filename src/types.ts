import { InterfaceDeclaration, TypeAliasDeclaration, EnumDeclaration, Node } from 'ts-morph';

export type TypeDeclaration = InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration;

export const isTypeDeclaration = (value: Node): value is TypeDeclaration => {
    return Node.isTypeAliasDeclaration(value) || Node.isInterfaceDeclaration(value) || Node.isEnumDeclaration(value);
};
