<template>
  <container>
    <!-- 地图 -->
    <Map></Map>
    <!-- 我方飞机 -->
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
    <!-- 敌方飞机 -->
    <EnemyPlane
      v-for="(enemy, index) in enemyPlanes"
      :key="index"
      :x="enemy.x"
      :y="enemy.y"
    ></EnemyPlane>
    <!-- 子弹 -->
    <Bullet
      v-for="(bullet, index) in bullets"
      :key="index"
      :x="bullet.x"
      :y="bullet.y"
    ></Bullet>
  </container>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue";
import Map from "../components/Map.vue";
import Plane, { usePlane } from "../components/Plane.vue";
import EnemyPlane, { useEnemyPlane } from "../components/EnemyPlane.vue";
import Bullet, { useBullet } from "../components/Bullet.vue";
import { game } from "../game";
import { hitTestObject } from "../utils";

export default {
  components: {
    Map,
    Plane,
    EnemyPlane,
    Bullet,
  },
  setup() {
    // 我方飞机
    const { planeInfo } = usePlane({
      onAttack(position) {
        addBullet(position);
      },
    });
    // 敌方飞机
    const { enemyPlanes, bulletHitEnemy } = useEnemyPlane();
    const { bullets, addBullet, destroyBullet } = useBullet();

    useFighting({
      planeInfo,
      enemyPlanes,
      bullets,
      bulletHitEnemy,
      destroyBullet,
    });

    return {
      planeInfo,
      enemyPlanes,
      bullets,
    };
  },
};

function useFighting({
  planeInfo,
  enemyPlanes,
  bullets,
  bulletHitEnemy,
  destroyBullet,
}) {
  function handleTicker() {
    // base case
    if (!enemyPlanes.length) {
      return;
    }

    // 判断我方飞机和敌军飞机是否碰撞
    enemyPlanes.forEach((enemyPlane, index) => {
      if (hitTestObject(planeInfo, enemyPlane)) {
        console.log("planeInfo hit enemyPlane");
      }
    });

    // base case
    if (!bullets.length) {
      return;
    }

    // 判断子弹是否击中敌方飞机
    enemyPlanes.forEach((enemyPlane, index) => {
      bullets.forEach((bullet, index) => {
        if (hitTestObject(enemyPlane, bullet)) {
          // 子弹击中敌军飞机
          bulletHitEnemy(enemyPlane, index);
          // 销毁子弹
          destroyBullet(index);
        }
      });
    });
  }

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  onBeforeUnmount(() => {
    game.ticker.remove(handleTicker);
  });

  return;
}
</script>

<style scoped></style>
