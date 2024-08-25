import { Application } from "pixi.js";

export const game = new Application({ width: 780, height: 1080 });

// 将 canvas 挂载至body节点
document.body.append(game.view);

// 获取根容器
export function getRootContainer() {
  return game.stage;
}
