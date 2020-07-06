var cielo_1 = require('cielo');
var cieloParams = {
    merchantId: '7a8b7c9c-4bb7-4caf-b967-f7192ab0cf72',
    merchantKey: 'WTXTZZSTBSBGCKSYAJBIOZJXJDRBNMAEHQEGTKNJ',
    sandbox: true,
    debug: true // Opcional - Exibe os dados enviados na requisição para a Cielo
};
var cielo = new cielo_1.Cielo(cieloParams);
const credito = (nome, amount, cardNumber, holder, exp,cv, id, bandeira)=>{
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
                SecurityCode:cv,
                expirationDate:exp
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
const debito = (nome, amount, cardNumber, holder, exp, cv, id, bandeira)=> {
    var vendaParams = {
        customer: {  
        name: nome     
        },
        merchantOrderId: id,
        payment: {  
            type: cielo_1.EnumCardType.DEBIT,
            amount: amount,
            provider: "Simulado",
            returnUrl: "http://64.227.106.165",
       debitCard:{  
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
const boleto = (amount,nome, cpf, rua,
    numeroCasa, complemento, cep, cidade, estadoAbreviacao,
     paisAbreviacao, bairro, id) => {
    const vendaParams = { 
    merchantOrderId: id,
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
      provider: 'Bradesco',
      assignor: 'Krakatoa Cangas',
      demonstrative: 'Compra de protudo(s) na Krakatoa Cangas',
      identification: '07046452000153',
      instructions: 'Aceitar somente até a data de vencimento, após essa data juros de 1% ao dia.'
    }
  }
  var status=
  cielo.bankSlip.create(vendaParams)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return console.error('ERRO', err);
    })
    return status;
}
 

export {credito,debito,boleto};