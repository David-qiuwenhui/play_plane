// 敌方飞机基本速度
const BASE_SPEED = 5;

// 敌方飞机的移动配置
export const enemyPlaneConfig = {
  x() {
    return 0 + Math.floor(Math.random() * 430);
  },
  y: -200,
  speed() {
    return BASE_SPEED + Math.floor(Math.random() * 10);
  },
};
