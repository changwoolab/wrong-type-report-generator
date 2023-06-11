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
 * 어느 소스파일에서 어떤 것을 import해야하는지에 대한 정보
 */
export type Dependencies = Map<SourceFile, ToImport>;

export interface AstRootNode {
    ast: AstNode;

    dependencies: Dependencies;
}

export interface AstNode {
    /**
     * 컬럼 이름 또는 어떤 컬럼의 부속품 종류 이름
     */
    name: NodeType | string;

    /**
     * 해당 컬럼의 타입
     */
    type: Primitives | Object | Union | string;

    /**
     * 마지막 엣지 노드가 아닌 경우에 가지는 arguments
     * 또는 유니온 타입의 children들
     */
    arguments?: AstNode[];
}
