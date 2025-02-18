/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 入口文件
 * @FilePath: \gcsoft-cli\src\main.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 09:55:30
 */
import { Command  } from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';

const program = new Command();

program
  .name('gcsoft-cli')
  .usage('<command> [options]')
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
    };
}
/**
 * gcsoft commands
 *    - config
 *    - init 
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
                required: false,
                description: '模板名称'
            },
            {
                key: 'projectName',
                required: false,
                description: '你的项目名称'
            }
        ]
    },
    config: {
        description: '配置 .gcsoftrc 文件',
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
                description: '如果handle为get，可不需要key'
            },
            {
                key: 'value',
                required: false,
                description: '如果handle为set，则需要value'
            }
        ]
        
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

    command.action(() => {
        switch (action) {
            case 'config': 
                //配置
                apply(action, ...process.argv.slice(3));
                break;
            case 'init':
                apply(action, ...process.argv.slice(3));
                break;
            default:
                break;
        }
    });
});

function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach((usage: string) => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}

// gcsoft -h 
// program.on('-h', help);
// program.on('--help', help);

// gcsoft 不带参数时
// if (!process.argv.slice(2).length) {
    program.showHelpAfterError('(add --help for additional information)');
// }

program.parse();
