//  'generated type guards for numeric enums in optional records',
export enum Types {
    TheGood = 1,
    TheBad,
    TheTypeSafe,
}
export interface TestItem {
    room: Partial<Record<Types, string>>;
}
