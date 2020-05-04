const Correios = require('frete');

module.exports = {
  async calculaPrazo(req, res) {
    const { cepOrigem, cepDestino } = req.body;
    Correios()
      .cepOrigem(cepOrigem)
      .servico([Correios.codigos.sedex, Correios.codigos.pac])
      .prazo(cepDestino, (err, results) => {
        if (!err) {
          res.send(results);
        }
      });
  },
};
