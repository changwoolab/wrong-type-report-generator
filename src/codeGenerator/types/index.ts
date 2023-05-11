export interface EdgeWhere {
    columnName: string;

    expectedType: string;

    received: string;
}

export interface InternalWhere {
    columnName: string;

    where: Where;
}

export type Where = EdgeWhere | InternalWhere;

export interface Report {
    isWrong: boolean;

    where: Where;
}
