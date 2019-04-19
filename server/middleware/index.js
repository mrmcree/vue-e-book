// 支持跨域
function setCors() {
  return async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
  };
}
module.exports = {
  setCors
};
