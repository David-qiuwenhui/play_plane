<template>
  <container>
    <sprite :texture="bulletImg"></sprite>
  </container>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import bulletImg from "../assets/bullet.png";
import { game } from "../game";
import { bulletConfig } from "../config";

export default {
  setup() {
    return {
      bulletImg,
    };
  },
};

export const useBullet = () => {
  // 子弹
  const bullets = ref([]);

  // 增加子弹
  const addBullet = (position) => {
    const { x, y } = position;
    bullets.value.push({
      x: x + 100, // 稍微微调子弹相对飞机的偏移量
      y,
    });
  };

  function move() {
    const { speed: bulletSpeed } = bulletConfig;
    // 控制子弹移动
    const handleTicker = () => {
      bullets.value.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;

        // 资源优化 子弹超出视野方位时消除
        if (bullet.y < -100) {
          bullets.value.splice(index, 1);
        }
      });
    };

    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onBeforeUnmount(() => {
      game.ticker.remove(handleTicker);
    });
  }

  move();
  return {
    bullets,
    addBullet,
  };
};
</script>

<style scoped></style>
