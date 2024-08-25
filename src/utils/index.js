/** 判断两个矩形是否有重合部分
 *
 * @param {Object} rectA
 * @param {Object} rectB
 * @returns
 */
export const hitTestObject = (rectA, rectB) => {
  return (
    rectA.x + rectA.width >= rectB.x &&
    rectB.x + rectB.width >= rectA.x &&
    rectA.y + rectA.height >= rectB.y &&
    rectB.y + rectB.height >= rectA.y
  );
};
