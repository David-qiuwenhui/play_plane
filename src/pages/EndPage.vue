<template>
  <container>
    <sprite :texture="endPageImg"></sprite>
    <sprite
      :texture="restartButtonImg"
      :interactive="true"
      x="230"
      y="515"
      @click="restartGame"
    ></sprite>
  </container>
</template>

<script>
import endPageImg from "../assets/end_page.jpg";
import restartButtonImg from "../assets/restartBtn.png";
export default {
  setup(props, { emit }) {
    const restartGame = () => {
      console.log("restart game");
      emit("change-page", "GamePage");
    };

    return {
      restartGame,
      endPageImg,
      restartButtonImg,
    };
  },
};
</script>

<style scoped></style>
