/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 管理 .gcsoftrc 配置文件
 * @FilePath: \gcsoft-cli\src\config.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-17 17:38:23
 */
// 管理 .gcsoftrc 文件 (当前用户目录下)
import { get, set, getAll, remove } from './utils/rc';

let config = async (handle: string, key: string | undefined, value: string | undefined) => {
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
            set(key, value);
            break;
        case 'remove':
            remove(key);
            break;
        default:
            break;
    }
}

export default config;