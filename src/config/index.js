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
  width: 398,
  height: 207,
  HP: 2,
};

// 子弹的移动配置
export const bulletConfig = {
  speed: 10,
  width: 61,
  height: 99,
};

// 我方飞机的移动配置
export const planeConfig = {
  x: 230,
  y: 750,
  width: 258,
  height: 364,
};
