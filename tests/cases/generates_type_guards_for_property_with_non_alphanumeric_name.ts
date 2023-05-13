// characters that are currently not supported include double quotes, backslashes and newlines
// `generates type guards for interface property with non-alphanumeric name '${propertyName}'`,
export interface Foo {
    '\0': number;
    ' ': number;
    '-': number;
    '+': number;
    '*': number;
    '/': number;
    '.': number;
    'foo bar': number;
    'foo-bar': number;
    'foo+bar': number;
    'foo/bar': number;
    'foo.bar': number;
    "'foobar'": number;
    '#hashtag': number;
    '1337_leadingNumbers': number;
}
