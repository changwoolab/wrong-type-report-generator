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

### How this is made

1. Get Typescript AST using `ts-morph`

2. Typescript AST -> [ Transformer ] -> Typeguard Generator AST

3. Typeguard Generator AST -> [Code Generator] -> Typeguard Code

_Why using Transformer? You may use only typescript AST._

Just for fun :)

# TODO

-   [ ] transform `a.b.c -> a['b']['c']` (to support things like this -> asdf['asdf.asdf'])
-   [ ] Refactor spaghetti code
-   [ ] code generator tests
-   [ ] duplicated property error optimization
-   [ ] performance optimization
