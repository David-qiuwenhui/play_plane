import { onMounted, onBeforeUnmount } from "vue";
import { game } from "../game";

export function planeMove(planeInfo) {
  const planeSpeed = 20;
  let leftAndRightCode = "";
  let upAndDownCode = "";

  //   处理键盘按下事件
  function handleKeydown(event) {
    const { code } = event;
    if (code === "ArrowRight" || code === "ArrowLeft") {
      leftAndRightCode = code;
    }

    if (code === "ArrowUp" || code === "ArrowDown") {
      upAndDownCode = code;
    }
  }

  //   处理键盘抬起事件
  function handleKeyup(event) {
    const { code } = event;
    if (code === "ArrowRight" || code === "ArrowLeft") {
      leftAndRightCode = "";
    }

    if (code === "ArrowUp" || code === "ArrowDown") {
      upAndDownCode = "";
    }
  }

  function handleTicker() {
    if (leftAndRightCode === "ArrowRight" || leftAndRightCode === "ArrowLeft") {
      if (leftAndRightCode === "ArrowRight") {
        planeInfo.x += planeSpeed;
      } else {
        planeInfo.x -= planeSpeed;
      }
    }

    if (upAndDownCode === "ArrowUp" || upAndDownCode === "ArrowDown") {
      if (upAndDownCode === "ArrowUp") {
        planeInfo.y -= planeSpeed;
      } else {
        planeInfo.y += planeSpeed;
      }
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
