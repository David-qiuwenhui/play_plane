<template>
  <container>
    <sprite :texture="planeImg"></sprite>
  </container>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount } from "vue";
import planeImg from "../assets/plane.png";

export default {
  setup() {
    return {
      planeImg,
    };
  },
};

// 飞机的移动逻辑
export const usePlane = ({ onAttack }) => {
  const planeInfo = reactive({
    x: 200,
    y: 200,
  });

  function move() {
    const planeSpeed = 20;
    function handlePlaneMove(event) {
      const { code } = event;
      switch (code) {
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
      window.addEventListener("keyup", handlePlaneMove);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keyup", handlePlaneMove);
    });
  }

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
  move();
  // 独立控制attack是否执行
  attack();

  return {
    planeInfo,
  };
};
</script>

<style scoped></style>
