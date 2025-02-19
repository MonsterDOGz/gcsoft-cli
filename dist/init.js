"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 初始化模板命令
 * @FilePath: \gcsoft-cli\src\init.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 17:35:28
 */
const get_1 = require("./utils/get");
const ora_1 = __importDefault(require("ora"));
const prompts_1 = require("@inquirer/prompts");
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
const init = async (templateName, projectName) => {
    // 项目不存在
    if (!fs_1.default.existsSync(projectName)) {
        try {
            // 命令行交互
            const answers = {
                description: await (0, prompts_1.input)({ message: "请输入项目描述: " }),
                author: await (0, prompts_1.input)({ message: '请输入作者姓名: ' }),
            };
            // 下载模板 选择模板
            // 通过配置文件，获取模板信息
            let loading = (0, ora_1.default)('downloading template ...');
            loading.start();
            await (0, get_1.downloadLocal)(templateName, projectName).catch((err) => {
                loading.fail();
                console.log(log_symbols_1.default.error, chalk_1.default.red(`template download failed.\r\n${err}`));
            });
            loading.succeed();
            const fileName = `${projectName}/package.json`;
            if (fs_1.default.existsSync(fileName)) {
                const data = fs_1.default.readFileSync(fileName).toString();
                let json = JSON.parse(data);
                json.name = projectName;
                json.author = answers.author;
                json.description = answers.description;
                // 修改项目文件夹中 package.json 文件
                fs_1.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                console.log(log_symbols_1.default.success, chalk_1.default.green('Project initialization finished!'));
            }
        }
        catch (err) {
        }
    }
    else {
        // 项目已经存在
        console.log(log_symbols_1.default.error, chalk_1.default.red('The project already exists'));
    }
};
exports.default = init;
