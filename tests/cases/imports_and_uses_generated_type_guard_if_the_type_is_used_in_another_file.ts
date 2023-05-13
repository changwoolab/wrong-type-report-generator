// 'imports and uses generated type guard if the type is used in another file',

export interface TestType {
    someKey: string | number;
}
// 'test-list.ts': `
// import { TestType } from './test';

// export type TestTypeList = Array<TestType>;
