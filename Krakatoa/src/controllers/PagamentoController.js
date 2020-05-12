const Pagamento = require('../models/Pagamento');

module.exports = {
  async Store(req, res) {
    const { produto, preco, metodo, pessoa, data } = req.body;
    try {
      const pagamento = await Pagamento.create({
        produto,
        preco,
        metodo,
        pessoa,
        data,
      });
      return res.json(pagamento);
    } catch (error) {
      return res.status(500).send('Não foi possivel salvar o pagamento');
    }
  },
};
