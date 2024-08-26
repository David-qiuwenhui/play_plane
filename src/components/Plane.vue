<template>
  <container>
    <sprite :texture="planeImg"></sprite>
  </container>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount } from "vue";
import planeImg from "../assets/plane.png";
import { planeConfig } from "../config";
import { planeMove } from "../components/planeMove";

export default {
  setup() {
    return {
      planeImg,
    };
  },
};

// 飞机的移动逻辑
export const usePlane = ({ onAttack }) => {
  const { x, y, width, height } = planeConfig;
  const planeInfo = reactive({
    x,
    y,
    width,
    height,
  });

  // 我方飞机攻击
  function attack() {
    function handlePlaneAttack(event) {
      const { code } = event;
      if (code === "Space") {
        onAttack && onAttack({ x: planeInfo.x, y: planeInfo.y });
      }
    }

    onMounted(() => {
      window.addEventListener("keyup", handlePlaneAttack);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keyup", handlePlaneAttack);
    });
  }

  // 独立控制move是否执行
  planeMove(planeInfo);
  // 独立控制attack是否执行
  attack();

  return {
    planeInfo,
  };
};
</script>

<style scoped></style>
