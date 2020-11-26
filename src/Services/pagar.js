var cielo_1 = require('cielo');
var cieloParams = {
  merchantId: "6250f814-b45a-45a3-b221-d69b2e822871",
  merchantKey: "eZjnxnJZdw7dm78T0NJOeMo9va5z4AaKQKpq3fje",
  sandbox: false,
  debug: false // Opcional - Exibe os dados enviados na requisição para a Cielo
};
var cielo = new cielo_1.Cielo(cieloParams);
const credito = (nome, amount, cardNumber, holder, exp, cv, id, bandeira) => {
  var vendaParams = {
    customer: {
      name: nome
    },
    merchantOrderId: id,
    payment: {
      amount: amount,
      creditCard: {
        brand: bandeira,
        cardNumber: cardNumber,
        holder: holder,
        SecurityCode: cv,
        expirationDate: exp
      },
      installments: 1,
      softDescriptor: "Krakatoa",
      type: cielo_1.EnumCardType.CREDIT,
      capture: false
    }
  };
  var status =
    cielo.creditCard.transaction(vendaParams)
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        return console.error('ERRO', err);
      });
  return status;
}
const debito = (nome, amount, cardNumber, holder, exp, cv, id, bandeira) => {
  var vendaParams = {
    customer: {
      name: nome
    },
    merchantOrderId: id,
    payment: {
      type: cielo_1.EnumCardType.DEBIT,
      Authenticate: true,
      amount: amount,
      returnUrl: "https://testekrakatoa.tk",
      debitCard: {
        cardNumber: cardNumber,
        holder: holder,
        expirationDate: exp,
        securityCode: cv,
        brand: bandeira
      }
    }
  }

  var status =
    cielo.debitCard.createSimpleTransaction(vendaParams)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return console.error('ERRO', err);
      })
  return status;
}
const boleto = (amount, nome, cpf, rua,
  numeroCasa, complemento, cep, cidade, estadoAbreviacao,
  paisAbreviacao, bairro, id) => {
  const vendaParams = {
    merchantOrderId: '123qad',
    customer: {
      name: nome,
      identity: cpf,
      address: {
        street: rua,
        number: numeroCasa,
        complement: complemento,
        zipCode: cep,
        city: cidade,
        state: estadoAbreviacao,
        country: paisAbreviacao,
        district: bairro,
      }
    },
    payment: {
      type: 'Boleto',
      amount: amount,
      provider: "Bradesco2",
      assignor: 'Krakatoa Cangas',
      demonstrative: 'Compra de produto(s) na Krakatoa Cangas',
      identification: "07046452000153",
    }
  }
  var status =
    cielo.bankSlip.create(vendaParams)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return console.error('ERRO', err);
      })
  return status;
}
const cancelar = (idPagamento) => {
  const cancelarParams = {
    paymentId: idPagamento,
  };

  cielo.creditCard.cancelTransaction(cancelarParams)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return console.error('ERRO', err);
    })
}

const consulta = () => {
  const consultaParams = {
    paymentId: "b1864997-06c7-4125-b22e-42f01a757270"
  };
  cielo.consult.paymentId(consultaParams)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
    })
}

export { consulta, cancelar, credito, debito, boleto };