/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 入口文件
 * @FilePath: \gcsoft-cli\src\main.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-26 11:15:41
 */
import { Command  } from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';

const program = new Command();

program
  .name('gcsoft')
  .description('基于模板快速生成项目的脚手架工具，提供 vue3、vue2 基础模板，以及手动输入指定模板。')
  .version(VERSION, '-V, --version', '输出版本号');

interface IArgument {
    key: string;
    required: boolean;
    description: string;
}

interface IActionMap {
    [key: string]: {
        description: string;
        usages: string[];
        arguments?: IArgument[];
        actionFunc: (...args: string[]) => void;
    };
}

/**
 * gcsoft commands
 *    - init 
 *    - config
 */
const actionMap: IActionMap = {
    init: {
        description: '从模板中生成新项目',
        usages: [
            'gcsoft init myProject'
        ],
        arguments: [
            {
                key: 'projectName',
                required: true,
                description: '你的项目名称'
            }
        ],
        actionFunc: (projectName) => {
            apply('init', projectName);
        }
    },
    config: {
        description: '配置 .gcsoftrc 文件，handle: init/get/set/remove',
        usages: [
            'gcsoft config init',
            'gcsoft config get',
            'gcsoft config get <key>',
            'gcsoft config set <key> <value>',
            'gcsoft config remove <key>'
        ],
        arguments: [
            {
                key: 'handle',
                required: true,
                description: 'init/get/set/remove'
            },
            {
                key: 'key',
                required: false,
                description: '键名'
            },
            {
                key: 'value',
                required: false,
                description: '键值，如果 handle 为 set 则需要 value'
            }
        ],
        actionFunc: (handle, key, value) => {
            apply('config', handle, key, value);
        }
    },
}

// 添加 init / config 命令
Object.keys(actionMap).forEach((action: string) => {
    const command = program.command(action)
    .description(actionMap[action].description)

    actionMap[action].arguments?.forEach((argument: IArgument) => {
        command.argument(argument.required ? `<${argument.key}>` : `[${argument.key}]`, argument.description);
    });

    command.action((...args) => {
        actionMap[action].actionFunc(...args);
    });
});

// 自定义帮助信息
function help() {
    let res = '\r\nExample call:\r\n'
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach((usage: string) => {
           res += '  - ' + usage + '\r\n';
        });
    });
    res += '\r';
    return res
}
program.addHelpText('after', help());
program.showHelpAfterError('(add --help for additional information)');

program.parse();
