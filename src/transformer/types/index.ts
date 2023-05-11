export interface AstNode {
    /**
     * 컬럼 이름
     */
    name: string;

    /**
     * 해당 컬럼의 타입
     */
    type: string;

    /**
     * 옵셔널 여부 (?[questionToken] 여부)
     */
    isOptional: boolean;

    /**
     * 마지막 엣지 노드가 아닌 경우에 가지는 arguments
     */
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
            isOptional: false,
        },
        {
            name: "userId",
            type: "number",
            isOptional: true,
        },

        
        {
            name: "reviewType",
            type: "union",
            isOptional: false,
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
