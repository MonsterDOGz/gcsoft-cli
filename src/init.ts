/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 初始化模板命令
 * @FilePath: \gcsoft-cli\src\init.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-25 15:27:21
 */
import { exec } from 'child_process';
import { downloadLocal } from './utils/get';
import { ensurePnpmInstalled } from './utils/pnpmInstall';
import { DEFAULTS } from './utils/constants';
import ora from 'ora';
import { input, select } from '@inquirer/prompts';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
const util = require('util');
const execPromise = util.promisify(exec);

const init = async (projectName: string) => {
    // 项目不存在
    if (!fs.existsSync(projectName)) {
        try {
            // 获取模板名称
            let templateName = '';
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
                        name: '手动指定模板',
                        value: 'manually',
                        description: '手动输入指定模板名称',
                    },
                ],
            })
            if (preset === 'manually') {
                // 手动输入模板名称
                const inputTemplateName = await input({ message: '请输入指定模板名称: ' })
                templateName = inputTemplateName;
            } else {
                templateName = DEFAULTS[preset as keyof typeof DEFAULTS];
            }
            const answers = {
                description: await input({ message: "请输入项目描述: " }),
                author: await input({ message: '请输入作者姓名: ' }),
            };

            // 下载模板
            let downloading = ora('downloading template ...');
            downloading.start();
            try {
                await downloadLocal(templateName, projectName)
                const fileName = `${projectName}/package.json`;
                if(fs.existsSync(fileName)){
                    const data = fs.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answers.author;
                    json.description = answers.description;
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                }
            } catch (err) {
                downloading.fail();
                console.log(symbol.error, chalk.red(`template download failed.\r\n${err}`));
                return
            }
            downloading.succeed();
            console.log(symbol.success, chalk.green('模板下载完成!'));
            console.log()

            // 判断是否安装了 pnpm
            await ensurePnpmInstalled()

            // 下载依赖
            let initializing = ora('initializing project ...');
            initializing.start();
            try {
                await execPromise(`cd ${projectName} && pnpm install`)
            } catch(error) {
                initializing.fail();
                console.log(symbol.error, chalk.red(`执行 pnpm install 时出错: ${error}`));
                return
            }
            initializing.succeed();
            console.log(symbol.success, chalk.green('依赖安装完成!'));

            console.log()
            console.log('使用以下命令开始:');
            console.log()
            console.log(chalk.gray('$ ')+chalk.cyan(`cd ${projectName}`))
            console.log(chalk.gray('$ ')+chalk.cyan(`pnpm run serve`))
            console.log()
        } catch (err) {
            console.log(symbol.error, chalk.red(`template init failed.\r\n${err}`));
            return
        }
    } else {
        console.log(symbol.error, chalk.red('项目已经存在'));
    }
}
export default init;