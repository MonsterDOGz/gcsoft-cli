/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 管理 .gcsoftrc 配置文件 (当前用户目录下)
 * @FilePath: \gcsoft-cli\src\config.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 16:01:06
 */
import chalk from 'chalk';
import { get, set, getAll, remove } from './utils/rc';

const config = async (handle: string, key: string | undefined, value: string | undefined) => {
    switch (handle) {
        case 'get':
            if (key) {
                let result = await get(key);
                console.log(result);
            } else {
                let obj = await getAll();
                Object.keys(obj).forEach(key => {
                    console.log(`${key}=${obj[key]}`);
                })
            }
            break;
        case 'set':
            if(!key) {
                console.log(chalk.red(chalk.bold('Error:')), chalk.red('key is required'));
                return;
            }
            set(key, value);
            break;
        case 'remove':
            if(!key) {
                console.log(chalk.red(chalk.bold('Error:')), chalk.red('key is required'));
                return;
            }
            remove(key);
            break;
        default:
            break;
    }
}

export default config;