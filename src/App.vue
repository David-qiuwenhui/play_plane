<template>
  <container>
    <!-- 开始页面 -->
    <StartPage
      v-if="currentPageName === 'StartPage'"
      @change-page="handleChangePage"
    >
    </StartPage>
    <!-- 游戏页面 -->
    <GamePage
      v-else-if="currentPageName === 'GamePage'"
      @change-page="handleChangePage"
    >
    </GamePage>
    <!-- 结束页面 -->
    <EndPage
      v-else-if="currentPageName === 'EndPage'"
      @change-page="handleChangePage"
    ></EndPage>
  </container>
</template>

<script>
import { ref } from "vue";
import StartPage from "./pages/StartPage.vue";
import GamePage from "./pages/GamePage.vue";
import EndPage from "./pages/EndPage.vue";
export default {
  name: "App",
  components: {
    StartPage,
    GamePage,
    EndPage,
  },

  setup() {
    // 当前显示的页面
    const currentPageName = ref("StartPage");
    // const currentPageName = ref("GamePage");
    // const currentPageName = ref("EndPage");

    // 修改当前显示的页面
    const handleChangePage = (targetPage) => {
      console.log("handleChangePage", targetPage);
      currentPageName.value = targetPage;
    };

    return {
      currentPageName,
      handleChangePage,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
