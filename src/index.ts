/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 主流程入口文件
 * @FilePath: \gcsoft-cli\src\index.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-18 14:16:39
 */
/**
 * @description: 主流程控制
 * @param {string} action
 * @param {array} args
 * @return {*}
 */
let apply = (action: string, ...args: string[]) => {
  import(`./${action}`).then((res) => {
    res.default(...args);
  });
};
export default apply;