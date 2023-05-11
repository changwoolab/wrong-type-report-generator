import { Project, SourceFile } from 'ts-morph';
import { transformer } from './transformer/transformer';
import { isTypeDeclaration, TypeDeclaration } from './types';

const getGuardName = (typeDeclaration: TypeDeclaration) => {
    return 'is' + typeDeclaration.getName();
};

export const generateTypeGuard = ({
    filePath,
    project,
}: // savePath,
{
    filePath: string;
    project: Project;
    // savePath: string;
}) => {
    const sourceFile = project.getSourceFile(filePath);
    if (!sourceFile) {
        throw new Error(`No sourcefile at ${filePath}`);
    }

    const exports = Array.from(sourceFile.getExportedDeclarations().values())
        .flat()
        .filter((ex) => ex.getSourceFile() === sourceFile);

    const typeDeclarations = exports.filter(isTypeDeclaration);

    // Get all type declarations
    const allTypesDeclarations: TypeDeclaration[] = [
        ...sourceFile.getInterfaces(),
        ...sourceFile.getTypeAliases(),
        ...sourceFile.getEnums(),
    ];

    // Get new AST
    const newAsts = allTypesDeclarations.map((typeDeclaration) => {
        return transformer(typeDeclaration);
    });

    // Generate guard then add to SourceFile
    // allTypesDeclarations.forEach((typeDeclaration) => {
    //     const guardName = getGuardName(typeDeclaration);
    // });

    // save guard file
};

generateTypeGuard({ filePath: 'test/interface.ts', project: new Project() });

const _generateTypeGuard = () => {};

// 타입 가드 만들기
// primitive 값 만남 -> 그냥 바로 타입 리포트에 담아서 리턴
// Non-primitive 만났을 때
//      일단 기본적으로 재귀적으로 한다. 타입 체크를 해서 타입 정의마다 할 행동을 정의한 함수로 보내주는 함수를 만들기.
//      Primitive level까지 내려가지 못하는 것들 (Array 등) -> Non-primitive를 처리해주는 함수로 보내고 리턴받아서
//      그 값 + 현재 컬럼 이름을 리포트에 넣기
//      Array Type인지 판별해주는 함수를 만드는 함수로 보내줘야함.

// Array 처리
