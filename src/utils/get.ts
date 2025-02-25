/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 获取模板
 * @FilePath: \gcsoft-cli\src\utils\get.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-25 10:47:18
 */
import { RC, DEFAULTS } from './constants';
import downloadGit from 'download-git-repo';
import { parse } from 'ini';
import { stat, readFile } from 'fs/promises'

export const downloadLocal = async (templateName: string, projectName: string) => {
    let config = null;
    const exist = await stat(RC).catch(() => {});
    if (exist) {
        config = await readFile(RC, 'utf8');
        config = parse(config);
    } else {
        // 如果系统中没有配置.gcsoftrc文件，就使用默认配置
        config = DEFAULTS
    }

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