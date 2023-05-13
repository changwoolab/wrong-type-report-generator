// any and unknown work in union types
type anyType = any;
type unknownType = unknown;

export type AnyOrString = string | anyType;
export type UnknownOrString = string | unknownType;
export type AnyOrUnknownOrString = string | anyType | unknownType;
