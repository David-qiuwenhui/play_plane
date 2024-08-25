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
import Map from "../components/Map.vue";
import Plane, { usePlane } from "../components/Plane.vue";
import EnemyPlane, { useEnemyPlane } from "../components/EnemyPlane.vue";
import Bullet, { useBullet } from "../components/Bullet.vue";

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
    const { enemyPlanes } = useEnemyPlane();
    const { bullets, addBullet } = useBullet();

    return {
      planeInfo,
      enemyPlanes,
      bullets,
    };
  },
};
</script>

<style scoped></style>
