
const app = require('./custom-express');
const routes = require('./routes');

const port = process.env.PORT;

app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
