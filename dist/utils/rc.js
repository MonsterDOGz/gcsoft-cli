"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.set = exports.getAll = exports.get = void 0;
/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 配置文件
 * @FilePath: \gcsoft-cli\src\utils\rc.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 16:58:11
 */
const promises_1 = require("fs/promises");
const ini_1 = require("ini");
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("./constants");
// RC 是配置文件
// DEFAULTS 是默认的配置
const get = async (key) => {
    const exist = await (0, promises_1.stat)(constants_1.RC);
    let opts;
    if (exist) {
        opts = await (0, promises_1.readFile)(constants_1.RC, 'utf8');
        opts = (0, ini_1.parse)(opts);
        return opts[key];
    }
    return '';
};
exports.get = get;
const getAll = async () => {
    const exist = await (0, promises_1.stat)(constants_1.RC);
    let opts;
    if (exist) {
        opts = await (0, promises_1.readFile)(constants_1.RC, 'utf8');
        opts = (0, ini_1.parse)(opts);
        return opts;
    }
    return {};
};
exports.getAll = getAll;
const set = async (key, value) => {
    if (!value) {
        console.log(chalk_1.default.red(chalk_1.default.bold('Error:')), chalk_1.default.red('value is required'));
        return;
    }
    const exist = await (0, promises_1.stat)(constants_1.RC);
    let opts;
    if (exist) {
        opts = await (0, promises_1.readFile)(constants_1.RC, 'utf8');
        opts = (0, ini_1.parse)(opts);
        Object.assign(opts, { [key]: value });
    }
    else {
        opts = Object.assign(constants_1.DEFAULTS, { [key]: value });
    }
    await (0, promises_1.writeFile)(constants_1.RC, (0, ini_1.stringify)(opts), 'utf8');
};
exports.set = set;
const remove = async (key) => {
    const exist = await (0, promises_1.stat)(constants_1.RC);
    let opts;
    if (exist) {
        opts = await (0, promises_1.readFile)(constants_1.RC, 'utf8');
        opts = (0, ini_1.parse)(opts);
        delete opts[key];
        await (0, promises_1.writeFile)(constants_1.RC, (0, ini_1.stringify)(opts), 'utf8');
    }
};
exports.remove = remove;
