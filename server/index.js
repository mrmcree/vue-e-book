var koa = require("koa");

var app = new koa();

const router = require("./router").router;
var setCors = require("./middleware").setCors;
app.use(setCors());
app.use(router.routes());
app.listen(8000, "0.0.0.0", () => {
  console.log("listen localhost:8000");
});
