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
export const usePlane = () => {
  const planeInfo = reactive({
    x: 200,
    y: 200,
  });

  function move() {
    const speed = 20;
    function handlePlaneMove(event) {
      const { code } = event;
      console.log("🚀 ~ handlePlaneMove ~ code:", code);
      switch (code) {
        case "ArrowRight":
          planeInfo.x += speed;
          break;
        case "ArrowLeft":
          planeInfo.x -= speed;
          break;
        case "ArrowUp":
          planeInfo.y -= speed;
          break;
        case "ArrowDown":
          planeInfo.y += speed;
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

  // 独立控制move是否执行
  move();
  return {
    planeInfo,
  };
};
</script>

<style scoped></style>
