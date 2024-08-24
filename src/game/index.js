import { Application } from "pixi.js";

const game = new Application({ width: 960, height: 1080 });

// 将 canvas 挂载至body节点
document.body.append(game.view);

// 获取根容器
export function getRootContainer() {
  return game.stage;
}
