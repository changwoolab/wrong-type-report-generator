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

export interface AstNode {
    /**
     * 컬럼 이름 또는 어떤 컬럼의 부속품의 이름
     */
    name: string;

    /**
     * 해당 컬럼의 타입
     */
    type: Primitives | Object | Union | string;

    /**
     * 마지막 엣지 노드가 아닌 경우에 가지는 arguments
     */
    arguments?: AstNode[];

    /**
     * 유니온 타입 등 children을 가질 때 children들
     */
    children?: AstNodeChildren[];
}

export interface AstNodeChildren {
    name: 'unionElement';
    type: string;
    arguments?: AstNode[];
}

/*

EX)

export type GetBestReviewListItemResponseDTO = {
    id: number;
    userId?: number; // 리뷰 작성자 id, 비회원 리뷰일 시 undefined
    reviewType: 0 | 1; // 리뷰 타입 (0: 일반리뷰, 1: 숨고페이 리뷰)
    reviewSurvey: string[];
    comments: {
        id: number;
        contents: string;
    }[];
};

{
    name: "GetBestReviewListItemResponseDTO",
    type: "Root",
    body: [
        {
            name: "id",
            type: "number",
        },
        {
            name: "userId",
            type: "number",
        },

        
        {
            name: "reviewType",
            type: "union",
            arguments: [
                {
                    name: "0",
                    type: "unionArgument",
                    value: 0
                },
                {
                    name: "0",
                    type: "unionArgument",
                    value: 1
                }
            ]
        },
        {
            name: "reviewSurvey",
            type: ""
        }
    ]
}

*/
