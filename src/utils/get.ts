/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 获取模板
 * @FilePath: \gcsoft-cli\src\utils\get.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 16:21:14
 */
import { getAll } from './rc';
import downloadGit from 'download-git-repo';

export const downloadLocal = async (templateName: string, projectName: string) => {
    let config = await getAll();
    let api = `${config.registry}/${templateName}`;
    return new Promise((resolve, reject) => {
        // projectName 为下载到的本地目录
        downloadGit(api, projectName, (err: any) => {
            if (err) {
                reject(err);
            }
            resolve(undefined);
        });
    });
}