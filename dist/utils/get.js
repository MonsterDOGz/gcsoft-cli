"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadLocal = void 0;
/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 获取模板
 * @FilePath: \gcsoft-cli\src\utils\get.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 16:21:14
 */
const rc_1 = require("./rc");
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const downloadLocal = async (templateName, projectName) => {
    let config = await (0, rc_1.getAll)();
    let api = `${config.registry}/${templateName}`;
    return new Promise((resolve, reject) => {
        // projectName 为下载到的本地目录
        (0, download_git_repo_1.default)(api, projectName, (err) => {
            if (err) {
                reject(err);
            }
            resolve(undefined);
        });
    });
};
exports.downloadLocal = downloadLocal;
