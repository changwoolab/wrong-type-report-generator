import { SourceFile } from 'ts-morph';

type Primitives =
    | 'number'
    | 'string'
    | 'bigint'
    | 'boolean'
    | 'undefined'
    | 'symbol'
    | 'null';

type Object = 'object';

type Union = 'union';

type Array = 'array';

type Intersection = 'intersection';

type Tuple = 'tuple';

type Enum = 'enum';

export type NodeType =
    | 'unionElement'
    | 'arrayElement'
    | 'intersectionElement'
    | 'tupleElement'
    | 'objectElement'
    | 'enumElement';

export type ParentNode = Object | Union | Array | Intersection | Tuple | Enum;

type ToImport = {
    [exportName: string]: string;
};

/**
 * Which to import from which sourcefile
 */
export type Dependencies = Map<SourceFile, ToImport>;

export interface AstRootNode {
    ast: AstNode;

    dependencies: Dependencies;
}

export interface AstNode {
    /**
     * Property name or name of specific type's part (union, object, etc.)
     */
    name: NodeType | string;

    /**
     * Type of the property
     */
    type: Primitives | Object | Union | string;

    /**
     * Children nodes
     */
    arguments?: AstNode[];
}
