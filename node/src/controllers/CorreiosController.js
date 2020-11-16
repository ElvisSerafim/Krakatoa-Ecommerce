const frete = require("frete");

const cepOrigem = "41610200";

module.exports = {
  async calcularPrazoPreco(req, res) {
    /* de 1 a 4 cangas 
36(comprimento)x26(largura)x16(altura)
[15:07, 01/08/2020] Luciana SITE: de 5 a 8 cangas 
36x26x32
[15:07, 01/08/2020] Luciana SITE: 9 a 12 cangas 
36x26x48 
=3kg */
    //    sedex: 40010, pac: 41106
    try {
      const { cepDestino, valorDeclarado, peso, altura } = req.body;
      const resultadoPac = new Promise((resolve, rejects) => {
        frete()
          .cepOrigem(cepOrigem)
          .servico("41106")
          .peso(peso)
          .formato(1)
          .altura(altura)
          .largura(26)
          .comprimento(36)
          .diametro(36)
          .maoPropria("N")
          .avisoRecebimento("S")
          .valorDeclarado(valorDeclarado)
          .preco(cepDestino, (err, result) => {
            if (!err) {
              resolve(result);
            }
            rejects(err);
          });
      });
      const resultadoSedex = new Promise((resolve, rejects) => {
        frete()
          .cepOrigem("41610200")
          .peso(peso)
          .formato(1)
          .altura(altura)
          .largura(26)
          .comprimento(36)
          .diametro(36)
          .maoPropria("N")
          .avisoRecebimento("S")
          .valorDeclarado(valorDeclarado)
          .servico("40010")
          .preco(cepDestino, (err, result) => {
            if (!err) {
              resolve(result);
            }
            rejects(err);
          });
      });
      const Tempo = new Promise((resolve, rejects) => {
        frete()
          .cepOrigem(cepOrigem)
          .servico([frete.codigos.sedex, frete.codigos.pac])
          .prazo(cepDestino, (err, results) => {
            if (!err) {
              resolve(results);
            }
            rejects(err);
          });
      });

      return res.status(200).json({
        pac: await resultadoPac,
        sedex: await resultadoSedex,
        tempo: await Tempo,
      });
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
};
