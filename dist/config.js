"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 管理 .gcsoftrc 配置文件 (当前用户目录下)
 * @FilePath: \gcsoft-cli\src\config.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 16:01:06
 */
const chalk_1 = __importDefault(require("chalk"));
const rc_1 = require("./utils/rc");
const config = async (handle, key, value) => {
    switch (handle) {
        case 'get':
            if (key) {
                let result = await (0, rc_1.get)(key);
                console.log(result);
            }
            else {
                let obj = await (0, rc_1.getAll)();
                Object.keys(obj).forEach(key => {
                    console.log(`${key}=${obj[key]}`);
                });
            }
            break;
        case 'set':
            if (!key) {
                console.log(chalk_1.default.red(chalk_1.default.bold('Error:')), chalk_1.default.red('key is required'));
                return;
            }
            (0, rc_1.set)(key, value);
            break;
        case 'remove':
            if (!key) {
                console.log(chalk_1.default.red(chalk_1.default.bold('Error:')), chalk_1.default.red('key is required'));
                return;
            }
            (0, rc_1.remove)(key);
            break;
        default:
            break;
    }
};
exports.default = config;
