const Contato = require('../models/Contato');

module.exports = {
  async Store(req, res) {
    try {
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
      if (contato) return res.json(contato);
      throw new Error('Não foi possivel Enviar Mensagem');
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
