import { TEST4_ARRAY } from '../MinimumRequiredTestCase';
import { TestType } from './toBeImported';

export interface Test {
    type: TestType;
}

const a = () => {
    const val = '' as unknown as TEST4_ARRAY;
    if (!Array.isArray(val.test41)) {
        // ~~
    }

    const a = val.test41.find((elem) => {
        // ~~~
    });

    if (a) {
        return false;
    }
};
