type anyType = any;
type unknownType = unknown;

export type AnyAndString = string & anyType;
export type UnknownAndString = string & unknownType;
export type AnyAndUnknownAndString = string & anyType & unknownType;
