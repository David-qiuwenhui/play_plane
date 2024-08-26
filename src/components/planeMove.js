import { onMounted, onBeforeUnmount } from "vue";
import { game } from "../game";

export function planeMove(planeInfo) {
  const planeSpeed = 20;

  // 数据结构
  const leftAndRightArr = [];
  const upAndDownArr = [];

  const upCommand = {
    type: "upAndDown",
    name: "up",
    dir: -1,
  };

  const downCommand = {
    type: "upAndDown",
    name: "down",
    dir: 1,
  };

  const leftCommand = {
    type: "leftAndRight",
    name: "left",
    dir: -1,
  };

  const rightCommand = {
    type: "leftAndRight",
    name: "right",
    dir: 1,
  };

  const map = {
    ArrowUp: upCommand,
    ArrowDown: downCommand,
    ArrowRight: rightCommand,
    ArrowLeft: leftCommand,
  };

  // 算法逻辑
  /**
   * 通过指令获取算法
   * @param {Object} command
   * @returns
   */
  function getArrByCommand(command) {
    if (command.type === "upAndDown") {
      return upAndDownArr;
    } else if (command.type === "leftAndRight") {
      return leftAndRightArr;
    }
  }

  /**
   * 将指令添加至数组
   * @param {Object} command
   */
  function addCommand(command) {
    const arr = getArrByCommand(command);
    arr.unshift(command);
  }

  /**
   * 将指令从数组中移除
   * @param {Object} command
   */
  function removeCommand(command) {
    const arr = getArrByCommand(command);
    const index = arr.indexOf(command);

    arr.splice(index, 1);
  }

  /**
   * 判断数组中是否存在目标指令
   * @param {Object} command
   * @returns
   */
  function isExistCommand(command) {
    const arr = getArrByCommand(command);
    const isExist = arr.includes(command);

    return isExist;
  }

  /**
   * 处理键盘按下的事件
   * @param {Object} event
   */
  function handleKeydown(event) {
    const { code } = event;
    const command = map[code];

    if (command && !isExistCommand(command)) {
      addCommand(command);
    }
  }

  /**
   * 处理键盘抬起的事件
   * @param {Object} event
   */
  function handleKeyup(event) {
    const { code } = event;
    const command = map[code];

    if (command && isExistCommand(command)) {
      removeCommand(command);
    }
  }

  function handleTicker() {
    const leftAndRightCommand = leftAndRightArr[0];
    if (leftAndRightCommand) {
      planeInfo.x += leftAndRightCommand.dir * planeSpeed;
    }

    const upAndDownCommand = upAndDownArr[0];
    if (upAndDownCommand) {
      planeInfo.y += upAndDownCommand.dir * planeSpeed;
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
