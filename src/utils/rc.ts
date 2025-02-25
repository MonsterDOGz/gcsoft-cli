/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 配置文件
 * @FilePath: \gcsoft-cli\src\utils\rc.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-25 10:19:01
 */
import { stat, readFile, writeFile } from 'fs/promises'
import { parse, stringify } from 'ini';
import chalk from 'chalk';
import { RC, DEFAULTS } from './constants';

// 初始化配置文件
export const init = async () => {
    try {
        await writeFile(RC, stringify(DEFAULTS), 'utf8');
        console.log(chalk.green('初始化配置文件成功！'))
    } catch (error: any) {
        console.log(chalk.red(`初始化配置文件时出错: ${error.message}`));
    }
}

export const get = async (key: string) => {
    const exist = await stat(RC).catch(err => {
        console.log(chalk.red(chalk.bold('Error:')), chalk.red(err.message));
        console.log(chalk.yellow('请先执行 gcsoft config init 命令，初始化配置文件 .gcsoftrc'));
    });
    let opts;
    if (exist) {
        opts = await readFile(RC, 'utf8');
        opts = parse(opts);
        return opts[key];
    }
    return '';
}

export const getAll = async () => {
    const exist = await stat(RC).catch(err => {
        console.log(chalk.red(chalk.bold('Error:')), chalk.red(err.message));
        console.log(chalk.yellow('请先执行 gcsoft config init 命令，初始化配置文件 .gcsoftrc'));
    });
    let opts;
    if (exist) {
        opts = await readFile(RC, 'utf8');
        opts = parse(opts);
        return opts;
    }
    return {};
}

export const set = async (key: string, value: string | undefined) => {
    if(!value) {
        console.log(chalk.red(chalk.bold('Error:')), chalk.red('value is required'));
        return;
    }

    const exist = await stat(RC).catch(err => {
        console.log(chalk.red(chalk.bold('Error:')), chalk.red(err.message));
        console.log(chalk.yellow('请先执行 gcsoft config init 命令，初始化配置文件 .gcsoftrc'));
    });
    let opts;
    if (exist) {
        opts = await readFile(RC, 'utf8');
        opts = parse(opts);
        Object.assign(opts, { [key]: value });
    } else {
        opts = Object.assign(DEFAULTS, { [key]: value });
    }
    await writeFile(RC, stringify(opts), 'utf8');
}

export const remove = async (key: string) => {
    const exist = await stat(RC).catch(err => {
        console.log(chalk.red(chalk.bold('Error:')), chalk.red(err.message));
        console.log(chalk.yellow('请先执行 gcsoft config init 命令，初始化配置文件 .gcsoftrc'));
    });
    let opts;
    if (exist) {
        opts = await readFile(RC, 'utf8');
        opts = parse(opts);
        delete opts[key];
        await writeFile(RC, stringify(opts), 'utf8');
    }
}
