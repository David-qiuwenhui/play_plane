import { createRenderer } from "vue";

const renderer = createRenderer({
  createElement(type) {
    console.log(type);
  },
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
