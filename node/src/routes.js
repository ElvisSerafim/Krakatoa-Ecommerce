const { Router } = require("express");
const CorreioController = require("./controllers/CorreiosController");

const routes = Router();

routes.post("/api/calcFrete", CorreioController.calcularPrazoPreco);

module.exports = routes;
