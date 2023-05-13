//  'guards should only be generated for types that are declared, exported, and annotated in the current file',
// {
//   'custom.ts': `
//   /** @see {isColor} ts-auto-guard:type-guard */
//   export type Color = 'red' | 'blue' | 'green'`,
//   'index.ts': `
//   export { Color } from './custom'`,
// },
