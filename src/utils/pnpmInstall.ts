import { exec } from 'child_process';
const util = require('util');
const execPromise = util.promisify(exec);
import chalk from 'chalk';
import ora from 'ora';

/**
 * 检查 pnpm 是否已安装，若未安装则尝试自动安装。
 */
export async function ensurePnpmInstalled() {
    try {
        // 尝试运行 pnpm --version 命令检查是否已安装 pnpm
        const { stdout } = await execPromise('pnpm --version');
        console.log(chalk.bold(`pnpm install v${stdout}`));
    } catch (error) {
        console.log('检测到您尚未安装 pnpm，现在为您自动安装...');
        let installing = ora('pnpm install ...');
        installing.start();
        try {
            // 使用 npm 安装 pnpm 到全局环境
            await execPromise('npm install pnpm -g');
        } catch (installError) {
            installing.fail();
            console.log(chalk.red(`自动安装 pnpm 失败: ${installError}`));
            process.exit(1); // 强制退出程序
        }
        installing.succeed();
        const { stdout } = await execPromise('pnpm --version');
        console.log(chalk.bold(`pnpm 安装完成! 版本：v${stdout}`));
    }
}