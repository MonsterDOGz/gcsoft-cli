/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 定义常量
 * @FilePath: \gcsoft-cli\src\utils\constants.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-17 15:14:53
 */
import {version} from '../../package.json';

// 当前 package.json 的版本号
export const VERSION = version;

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

// 配置文件目录
export const RC = `${HOME}/.gcsoftrc`;

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/MonsterDOGz/repos
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
export const DEFAULTS = {
    type: 'users',
    registry: 'MonsterDOGz',
}