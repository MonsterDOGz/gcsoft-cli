/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 初始化模板命令
 * @FilePath: \gcsoft-cli\src\init.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-24 16:27:06
 */
import { downloadLocal } from './utils/get';
import { DEFAULTS } from './utils/constants';
import ora from 'ora';
import { input, select } from '@inquirer/prompts';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

const init = async (projectName: string) => {
    // 项目不存在
    if (!fs.existsSync(projectName)) {
        try {
            let templateName = '';
            // 命令行交互
            const preset = await select({
                message: "请选择一个预设模板: ",
                choices: [
                    {
                        name: 'vue3',
                        value: 'vue3',
                        description: '基于 vue3 的预设模板',
                    },
                    {
                        name: 'vue2',
                        value: 'vue2',
                        description: '基于 vue2 的预设模板',
                    },
                    {
                        name: '指定模板',
                        value: 'manually',
                        description: '手动输入模板名称',
                    },
                ],
            })
            if (preset === 'manually') {
                // 手动输入模板名称
                const inputTemplateName = await input({ message: '请输入模板名称: ' })
                templateName = inputTemplateName;
            } else {
                templateName = DEFAULTS[preset as keyof typeof DEFAULTS];
            }
            const answers = {
                description: await input({ message: "请输入项目描述: " }),
                author: await input({ message: '请输入作者姓名: ' }),
            };

            // 下载模板 选择模板
            // 通过配置文件，获取模板信息
            let loading = ora('downloading template ...');
            loading.start();
            downloadLocal(templateName, projectName).then(() => {
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                if(fs.existsSync(fileName)){
                    const data = fs.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answers.author;
                    json.description = answers.description;
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    console.log(symbol.success, chalk.green('Project initialization finished!'));
                }
            }).catch((err) => {
                loading.fail();
                console.log(symbol.error, chalk.red(`template download failed.\r\n${err}`));
            });
        } catch (err) {
        }
    } else {
        // 项目已经存在
        console.log(symbol.error, chalk.red('The project already exists'));
    }
}
export default init;