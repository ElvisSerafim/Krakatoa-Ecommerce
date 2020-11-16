const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = require("./custom-express");
const routes = require("./routes");

const port = process.env.PORT;
const host = "localhost";
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
