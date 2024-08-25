<template>
  <container>
    <sprite :texture="MapImg" :y="mapY1"></sprite>
    <sprite :texture="MapImg" :y="mapY2"></sprite>
  </container>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { game } from "../game";
import MapImg from "../assets/map.jpg";

export default {
  setup() {
    const { mapY1, mapY2 } = useMove();

    return {
      MapImg,
      mapY1,
      mapY2,
    };
  },
};

// 更新图片坐标的逻辑
function useMove() {
  const gameHeight = 1080;
  const mapY1 = ref(0);
  const mapY2 = ref(-gameHeight);

  const speed = 10;
  function handleTicker() {
    mapY1.value += speed;
    mapY2.value += speed;

    if (mapY1.value >= gameHeight) {
      mapY1.value = -gameHeight;
    }

    if (mapY2.value >= gameHeight) {
      mapY2.value = -gameHeight;
    }
  }

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  onBeforeUnmount(() => {
    game.ticker.remove(handleTicker);
  });

  return {
    mapY1,
    mapY2,
  };
}
</script>

<style scoped></style>
