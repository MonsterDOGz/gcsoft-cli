/*
 * @Author: MonsterDOG
 * @Date: 2023-10-16 14:29:33
 * @Description: 主流程入口文件
 * @FilePath: \gcsoft-cli\src\index.ts
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2025-02-17 17:37:05
 */
// 主的流程控制
let apply = (action: string, ...args: string[]) => {
  import(`./${action}`).then((res) => {
    res.default(...args);
  });
};
export default apply;