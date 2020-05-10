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
        return res.status(400).send(err);
      });
  },
  async calcularPrazoPreco(req, res) {
    //    sedex: 40010, pac: 41106

    const {
      cepOrigem, cepDestino, valorDeclarado, codigoServico,
    } = req.body;
    Correios.cepOrigem(cepOrigem).servico(codigoServico);
    Correios({
      cepDestino,
      peso: 1,
      formato: 1,
      comprimento: 16,
      altura: 2,
      largura: 11,
      diametro: 1,
      maoPropria: 'N',
      valorDeclarado,
      avisoRecebimento: 'S',
    }).preco((err, result) => {
      if (!err) {
        return res.send(result);
      }
      return res.status(404).send(err);
    });
  },
};
