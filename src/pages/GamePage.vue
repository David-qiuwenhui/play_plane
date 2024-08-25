<template>
  <container>
    <sprite :texture="MapImg"></sprite>
  </container>
</template>

<script>
import MapImg from "../assets/map.jpg";

export default {
  setup(props, { emit }) {
    return {
      MapImg,
    };
  },
};
</script>

<style scoped></style>
