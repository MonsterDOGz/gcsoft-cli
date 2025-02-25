# gcsoft-cli

基于模板快速生成项目的脚手架工具，提供 `vue3`、`vue2` 基础模板，以及手动输入指定模板。

## Install

```sh
# npm
npm install -g gcsoft-cli

# pnpm
pnpm add -g gcsoft-cli
```

## Usage

- `gcsoft init myProject` 初始化一个新项目，选择模板
- `gcsoft config init` 初始化本地配置文件
- `gcsoft config get` 查看所有配置信息
- `gcsoft config set <key> <value>` 修改配置信息
- `gcsoft config remove <key>` 删除配置信息
- `gcsoft --version` 查看当前版本号
- `gcsoft --help` 查看帮助信息

## Config

可以自行配置 gcsoft-cli，可修改 `type`, `registry`, `vue3`, `vue2` 配置项
- `gcsoft config set type users`
- `gcsoft config set registry MonsterDOGz`
- `gcsoft config set vue3 vue3-template` 修改 vue3 模板
- `gcsoft config set vue2 vue2-template` 修改 vue2 模板