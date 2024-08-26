import { onMounted, onBeforeUnmount } from "vue";
import { game } from "../game";

export function planeMove(planeInfo) {
  const planeSpeed = 20;
  let keyCode = "";

  //   处理键盘按下事件
  function handleKeydown(event) {
    const { code } = event;
    keyCode = code;
  }

  //   处理键盘抬起事件
  function handleKeyup() {
    keyCode = "";
  }

  function handleTicker() {
    switch (keyCode) {
      case "ArrowRight":
        planeInfo.x += planeSpeed;
        break;
      case "ArrowLeft":
        planeInfo.x -= planeSpeed;
        break;
      case "ArrowUp":
        planeInfo.y -= planeSpeed;
        break;
      case "ArrowDown":
        planeInfo.y += planeSpeed;
        break;
    }
  }

  onMounted(() => {
    game.ticker.add(handleTicker);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
  });

  onBeforeUnmount(() => {
    game.ticker.remove(handleTicker);
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keyup", handleKeyup);
  });
}
