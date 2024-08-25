import { createRenderer } from "vue";
import { Texture, Container, Sprite, Text } from "pixi.js";
const renderer = createRenderer({
  createElement(type) {
    console.log("🚀 ~ createElement ~ type:", type);
    let element;
    switch (type) {
      case "container":
        // 容器
        element = new Container();
        break;
      case "sprite":
        // 图片
        element = new Sprite();
        break;
      default:
        break;
    }

    return element;
  },

  insert(el, parent) {
    if (el && parent) {
      parent.addChild(el);
    }
  },

  patchProp(el, key, prevValue, nextValue) {
    console.log("🚀 ~ patchProp ~ key:", { el, key, nextValue });
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        el.on("pointertap", nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },

  createComment() {},

  // 获取当前 node 的父级节点
  parentNode(node) {
    return node.parent;
  },

  nextSibling() {},

  remove(el) {
    if (el && el.parent) {
      el.parent.removeChild(el);
    }
  },

  createText(text) {
    return new Text(text);
  },
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
