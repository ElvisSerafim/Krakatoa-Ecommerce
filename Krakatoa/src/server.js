const app = require('./config/custom-express');
const routes = require('./routes');

const porta = 4000;

app.use(routes);

app.listen(4000, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
