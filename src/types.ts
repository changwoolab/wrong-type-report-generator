import {
    InterfaceDeclaration,
    TypeAliasDeclaration,
    EnumDeclaration,
    Node,
    ClassDeclaration,
} from 'ts-morph';

export type TypeDeclaration =
    | InterfaceDeclaration
    | TypeAliasDeclaration
    | EnumDeclaration
    | ClassDeclaration;

export const isTypeDeclaration = (value: Node): value is TypeDeclaration => {
    return (
        Node.isTypeAliasDeclaration(value) ||
        Node.isInterfaceDeclaration(value) ||
        Node.isEnumDeclaration(value) ||
        Node.isClassDeclaration(value)
    );
};
