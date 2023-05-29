import { getNewAstNode } from '../../reporterAst/astUtils';
import { addTypeToDependencyMap } from '../../utils';
import { ParseNode } from '../transformer';

export const parseClass = ({ name, type, addToDependencyMap }: ParseNode) => {
    // add to dependency then use "instanceof" operator when generating code
    addTypeToDependencyMap(type, addToDependencyMap);

    return getNewAstNode({
        name,
        type: 'class',
    });
};
