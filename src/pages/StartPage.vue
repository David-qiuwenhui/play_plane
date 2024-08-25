<template>
  <container>
    <sprite :texture="startPageImg"></sprite>
    <sprite
      :texture="startButtonImg"
      :interactive="true"
      x="230"
      y="515"
      @click="startGame"
    ></sprite>
  </container>
</template>

<script>
import startPageImg from "../assets/start_page.jpg";
import startButtonImg from "../assets/startBtn.png";
export default {
  setup(props, { emit }) {
    const startGame = () => {
      emit("change-page", "GamePage");
    };
    return {
      startGame,
      startPageImg,
      startButtonImg,
    };
  },
};
</script>

<style scoped></style>
