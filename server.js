const app = require("./server/app");
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app is runnig on http://localhost:${port}`);
});
