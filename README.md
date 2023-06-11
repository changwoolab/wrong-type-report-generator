# How this is made

### 1. Get Typescript AST using `ts-morph`

### 2. Typescript AST -> [ Transformer ] -> Typeguard Generator AST

### 3. Typeguard Generator AST -> [Code Generator] -> Typeguard Code

### Why using Transformer? You may use only typescript AST.

Just for fun :)

# TODO

-   [ ] transform `a.b.c -> a['b']['c']` (to support things like this -> asdf['asdf.asdf'])
-   [ ] code generator tests
-   [ ] duplicated property error optimization
-   [ ] performance optimization
