import { TypeDeclaration } from '../types';
import { getNewRootAst } from '../reporterAst/astUtils';
import { createAddToDependencyMap } from '../utils';
import { parseNode } from './nodeParser';

/**
 * input: ts-morph로 생성된 TypeDeclaration 1개 (AST)
 * output: Typeguard Code Generator를 위한 새로운 AST
 */
export const transformer = (typeDeclaration: TypeDeclaration) => {
    const typeName = typeDeclaration.getName()!;

    const { getDependencyMap, addToDependencyMap } = createAddToDependencyMap();
    const astNode = parseNode({
        name: typeName,
        type: typeDeclaration.getType(),
        addToDependencyMap,
    });

    return getNewRootAst({ astNode, dependencies: getDependencyMap() });
};
