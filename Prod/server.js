const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } catch (error) {
    return res.status(500);
  }
});

const port = 9000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
  