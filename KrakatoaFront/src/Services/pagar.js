var cielo_1 = require('cielo');
var cieloParams = {
    merchantId: process.env.REACT_APP_MERCHANT_ID,
    merchantKey: process.env.REACT_APP_MERCHANT_KEY,
    sandbox: false,
    debug: false // Opcional - Exibe os dados enviados na requisição para a Cielo
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
            Authenticate:true,
            amount: amount,
            returnUrl: process.env.REACT_APP_MERCHANT_URL,
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
      provider: process.env.REACT_APP_PROVEDOR_BOLETO,
      assignor: 'Krakatoa Cangas',
      demonstrative: 'Compra de protudo(s) na Krakatoa Cangas',
      identification: process.env.REACT_APP_CNPJ,
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
const cancelar = ()=>{
  const cancelarParams = {
    paymentId: "a059e639-80d8-4adf-9436-986974fc543f",
    amount: 1, // Caso o valor não seja definido, cancela a venda no valor total
  };
  
  cielo.creditCard.cancelTransaction(cancelarParams)
    .then((data) => {
        return console.log(data);
    })
    .catch((err) => {
        return console.error('ERRO', err);
    })
}

const consulta = ()=>{
  const consultaParams = {
    paymentId: "d9b79393-a1a6-4c05-9b19-87fee4d4ce92"
  };
  cielo.consult.paymentId(consultaParams)
  .then((data) => {
      console.log(data)
  })
  .catch((err) => {
      console.log(err);
  })
}

export {consulta,cancelar,credito,debito,boleto};