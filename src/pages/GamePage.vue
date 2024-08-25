<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
    <EnemyPlane
      v-for="(enemy, index) in enemyPlanes"
      :key="index"
      :x="enemy.x"
      :y="enemy.y"
    ></EnemyPlane>
  </container>
</template>

<script>
import Map from "../components/Map.vue";
import Plane, { usePlane } from "../components/Plane.vue";
import EnemyPlane, { useEnemyPlane } from "../components/EnemyPlane.vue";

export default {
  components: {
    Map,
    Plane,
    EnemyPlane,
  },
  setup() {
    // 我方飞机
    const { planeInfo } = usePlane();
    // 敌方飞机
    const { enemyPlanes } = useEnemyPlane();

    return {
      planeInfo,
      enemyPlanes,
    };
  },
};
</script>

<style scoped></style>
