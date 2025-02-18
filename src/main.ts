/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 入口文件
 * @FilePath: \gcsoft-cli\src\main.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 16:17:51
 */
import { Command  } from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';

const program = new Command();

program
  .name('gcsoft-cli')
  .description('一个简单的脚手架工具')
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
            'gcsoft init templateName projectName'
        ],
        arguments: [
            {
                key: 'templateName',
                required: true,
                description: '模板名称'
            },
            {
                key: 'projectName',
                required: true,
                description: '你的项目名称'
            }
        ],
        actionFunc: (templateName, projectName) => {
            apply('init', templateName, projectName);
        }
    },
    config: {
        description: '配置 .gcsoftrc 文件，handle: get/set/remove',
        usages: [
            'gcsoft config set <key> <value>',
            'gcsoft config get <key>',
            'gcsoft config remove <key>'
        ],
        arguments: [
            {
                key: 'handle',
                required: true,
                description: 'set/get/remove'
            },
            {
                key: 'key',
                required: false,
                description: '请输入键名'
            },
            {
                key: 'value',
                required: false,
                description: '如果handle为set，则需要value'
            }
        ],
        actionFunc: (handle, key, value) => {
            apply('config', handle, key, value);
        }
        
    },
    //other commands
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
