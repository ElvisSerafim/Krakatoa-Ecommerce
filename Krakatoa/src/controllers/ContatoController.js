const Contato = require('../models/Contato');

module.exports = {
  async Store(req, res) {
    const {
      nome,
      email,
      assunto,
      mensagem,
    } = req.body;

    const contato = await Contato.create({
      nome,
      email,
      assunto,
      mensagem,
    });
    return res.json(contato);
  },
};
