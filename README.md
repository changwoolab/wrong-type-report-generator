# Motivation

When your DTO is different from your backend's specification and have no way to detect it, it is hard to debug the error!    
Below is an example of WTF moment.
```tsx
// Your DTO
interface meDto {
    ...
    user: {
        id: number;
    }
    ...
}

// From your backend
{
    ...
    user: "{id: 123}" // WTF?! it is too hard to find!
    ...
}
```

So, when Backend's API response is different from our DTO, report it!

# Installation

`npm i wrong-type-report-generator`

# Usage

### 1. Generate wrong-type-report

```tsx
import { generateWrongTypeReport } from 'wrong-type-report-generator';

const files = getFiles();

await generateWrongTypeReport({
    filePaths: files,
    outDirPath: './generated',
});
```

### 2. Use generated reporter with Axios then send wrong type report

```tsx
import { generateReporter } from 'wrong-type-report-generator';
import { validateDto } from './generated';

const report = generateReporter((errorReport) => {
    sendForDebug(errorReport);
});

export const xxxApi = async () => {
    return axios.get('www.xxx.xxx').then(report(validateDto)); // use generated reporter here!
};
```

# TODO

-   [ ] Generatiion Optimization
-   [ ] Refactor spaghetti code
-   [ ] performance optimization
-   [ ] code generator tests
-   [ ] duplicated property error optimization
