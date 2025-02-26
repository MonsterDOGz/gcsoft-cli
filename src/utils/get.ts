/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 获取模板
 * @FilePath: \gcsoft-cli\src\utils\get.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-26 16:36:00
 */
import { RC, DEFAULTS } from './constants';
import degit from 'degit';
import { parse } from 'ini';
import { stat, readFile } from 'fs/promises'

export const downloadLocal = async (templateName: string, projectName: string) => {
    let config = null;
    try {
        const exist = await stat(RC);
        config = await readFile(RC, 'utf8');
        config = parse(config);
    } catch(err) {
        // 如果系统中没有配置.gcsoftrc文件，就使用默认配置
        config = DEFAULTS
    }

    let api = `${config.registry}/${templateName}`;
    const emitter = degit(api)
    try {
        await emitter.clone(projectName);
    } catch(err) {
        throw err;
    }
}