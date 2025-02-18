/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 初始化模板命令
 * @FilePath: \gcsoft-cli\src\init.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 17:35:28
 */
import { downloadLocal } from './utils/get';
import ora from 'ora';
import { input } from '@inquirer/prompts';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

const init = async (templateName: string, projectName: string) => {
    // 项目不存在
    if (!fs.existsSync(projectName)) {
        try {
            // 命令行交互
            const answers = {
                description: await input({ message: "请输入项目描述: " }),
                author: await input({ message: '请输入作者姓名: ' }),
            };

            // 下载模板 选择模板
            // 通过配置文件，获取模板信息
            let loading = ora('downloading template ...');
            loading.start();
            await downloadLocal(templateName, projectName).catch((err) => {
                loading.fail();
                console.log(symbol.error, chalk.red(`template download failed.\r\n${err}`));
            });
            loading.succeed();
            const fileName = `${projectName}/package.json`;
            if(fs.existsSync(fileName)){
                const data = fs.readFileSync(fileName).toString();
                let json = JSON.parse(data);
                json.name = projectName;
                json.author = answers.author;
                json.description = answers.description;
                // 修改项目文件夹中 package.json 文件
                fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                console.log(symbol.success, chalk.green('Project initialization finished!'));
            }
        } catch (err) {
        }
    } else {
        // 项目已经存在
        console.log(symbol.error, chalk.red('The project already exists'));
    }
}
export default init;