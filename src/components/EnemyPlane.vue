<template>
  <container>
    <sprite :texture="enemyImg"> </sprite>
  </container>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { enemyPlaneConfig } from "../config";
import { game } from "../game";
import enemyImg from "../assets/enemy.png";

export default {
  setup() {
    return {
      enemyImg,
    };
  },
};

export const useEnemyPlane = () => {
  const enemyPlanes = reactive([]);

  // 敌方飞机移动控制
  function move() {
    // 自动生成敌方飞机
    const timer = ref(null);
    const createEnemyPlane = () => {
      const { x, y, width, height, speed, HP } = enemyPlaneConfig;

      timer.value = setInterval(() => {
        const plane = {
          x: x(),
          y,
          width,
          height,
          speed: speed(),
          HP,
        };
        enemyPlanes.push(plane);
      }, 800);
    };

    // 控制飞机移动
    const handleTicker = () => {
      enemyPlanes.forEach((enemy, index) => {
        enemy.y += enemy.speed;

        // 资源优化 飞机超出视野方位内消除
        if (enemy.y > 1300) {
          enemyPlanes.splice(index, 1);
        }
      });
    };

    onMounted(() => {
      game.ticker.add(handleTicker);
      createEnemyPlane();
    });

    onBeforeUnmount(() => {
      game.ticker.remove(handleTicker);
      // 清除飞机生成器
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    });
  }

  // 敌军飞机移动控制
  move();

  function bulletHitEnemy(enemyPlane, enemyPlaneIndex) {
    enemyPlane.HP--;
    // 销毁敌军飞机
    if (enemyPlane.HP <= 0) {
      enemyPlanes.splice(enemyPlaneIndex, 1);
    }
  }

  return {
    enemyPlanes,
    bulletHitEnemy,
  };
};
</script>

<style scoped></style>
