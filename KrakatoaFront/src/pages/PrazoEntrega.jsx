import React from 'react';
import { Container, Typography } from '@material-ui/core/';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';


const PrazoEntrega = () => (
  <>
    <Container maxWidth="lg" style={{ marginBottom: 64 }}>
      <Typography variant="h1" style={{ paddingTop: 20, paddingBottom: 20 }}>
        Prazo de Entrega
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10 }}>
        Enviamos para todo o Brasil e disponibilizamos os serviços dos Correios, variando o prazo de entrega conforme as localidades de origem e destino da remessa:
      </Typography>
      <Typography variant="h1" style={{ paddingBottom: 20 }}>
        Correios
      </Typography>
      <Typography variant="h1" style={{ paddingBottom: 10 }}>
        * PAC (modalidade econômica e sujeita a atrasos).
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10, paddingLeft: 10 }}>
        Serviço de encomenda da linha econômica para o envio exclusivo de mercadoria.

      </Typography>
      <Typography variant="h1" style={{ paddingBottom: 10 }}>
        * SEDEX (modalidade expressa).
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10, paddingLeft: 10 }}>
        Serviço de encomenda expressa de documentos e mercadorias.

        O SEDEX possui entrega domiciliar, em dias úteis, de segunda a sexta, em todos os municípios do Brasil.
        A entrega da encomenda em área rural ou de risco é realizada exclusivamente na agência dos Correios mais próxima do endereço do destinatário.
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10, paddingLeft: 10 }}>
        Tentativas de entrega:
        Haverá 3 (três) tentativas de entrega em dias úteis seguidos, sendo a primeira na mesma data de chegada na unidade de distribuição.

        Sendo impossível a entrega devido a casa fechada ou ausência de pessoa civilmente capaz, a encomenda ficará disponível para entrega na agência mais próxima do endereço do destinatário, durante sete (7) dias corridos, após o que será devolvida ao remetente
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10 }}>
        Assim que o pedido é postado na agência dos Correios, começa a vigorar o prazo de entrega, que pode variar de acordo com a localidade e forma de envio escolhida por você no momento da finalização da sua compra.
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10 }}>
        Possíveis atrasos na entrega após a postagem não é de nossa responsabilidade, já que a mesma fica exclusivamente a cargo dos correios.
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10 }}>
        É fundamental que exista alguém no endereço de entrega para receber a mercadoria, uma vez que após três tentativas de entrega pelos Correios, o seu pedido estará sujeito à devolução para o nosso Centro de Distribuição. Nesses casos, o cliente será novamente cobrado pelo frete para o reenvio da mercadoria. A entrega pode ser realizada para terceiros, como parentes e porteiros, desde que estejam autorizados pelo comprador a receber a mercadoria, mediante assinatura do comprovante de entrega e apresentação de documentos.
      </Typography>
      <Typography variant="h6" style={{ paddingBottom: 10 }}>
        Qualquer dúvida ou problema com o seu pedido, entrar em contato conosco pelo email de contato.
      </Typography>

      <Typography variant="h1">
        Email para contato: atendimento@krakatoacangas.com.br
      </Typography>

    </Container>
  </>
);

export default withNav(withAnimation(PrazoEntrega));
