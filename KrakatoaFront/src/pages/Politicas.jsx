import React from 'react';
import { Container, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';



const Politicas = () => {
  return (
    <>
      <Container maxWidth="lg" style={{ marginBottom: 64 }}>
        <Typography variant="h1" style={{paddingTop:20, paddingBottom: 20 }}>
          Trocas e Cancelamento
        </Typography>
        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Nossa política de troca e devolução tem o compromisso de garantir a
          satisfação de nossos clientes, e para isso foi criada com base no
          Código de Defesa do Consumidor.
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Você pode solicitar a troca ou devolução dos seus produtos em até 7
          dias corridos, a partir do recebimento do pedido. Entre em contato com
          a nossa Central de Relacionamento, através do e-mail
          atendimento@krakatoacangas.com.br, ou por tel (71) 3375-3856,
          informando o interesse em devolução ou troca do produto e solicite
          também uma reserva do novo produto que lhe interessa.
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Você pode solicitar a troca ou devolução dos seus produtos em até 7
          dias corridos, a partir do recebimento do pedido. Entre em contato com
          a nossa Central de Relacionamento, através do e-mail
          atendimento@krakatoacangas.com.br, ou por tel (71) 3375-3856,
          informando o interesse em devolução ou troca do produto e solicite
          também uma reserva do novo produto que lhe interessa.
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          O produto enviado não deve ter indícios de uso ou avarias e deve
          seguir etiquetas afixadas. Caso o produto não chegue em boas condições
          de uso, a KRAKATOA poderá recusá-lo, devolvendo o mesmo para o
          remetente.
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Os custos de envio troca e cancelamento são de responsabilidade do
          cliente (ida e volta).
        </Typography>
        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          Antes de receber o novo pedido, ou estorno, o item trocado ou
          devolvido precisa chegar ao NOSSO ESTOQUE , onde passará por um
          processo de qualidade que pode levar até 4 dias úteis para ser
          concluído. Depois disso, a contrapartida é liberada. Caso tenha
          escolhido um outro produto, será calculado o novo prazo de entrega de
          acordo com o seu CEP.
        </Typography>
        <Typography variant="h1" style={{ paddingBottom: 20 }}>
          Produto com defeito/ produto trocado{' '}
        </Typography>
        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Todos os produtos vendidos pela KRAKATOA passam por uma análise de
          qualidade antes de serem enviados.
        </Typography>
        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Ainda assim, se for detectado qualquer tipo de defeito de fabricação,
          a troca/devolução deve ser solicitada dentro do prazo de 7 dias
          corridos, contados a partir da data do recebimento. Entre em contato
          com a nossa Central de Relacionamento, através do e-mail
          atendimento@krakatoacangas.com.br, ou por tel(71) 3375-3856 ,
          informando o defeito detectado ( se possível com foto ) e declarando o
          interesse em devolução ou troca do produto, solicite também uma
          reserva do novo produto que lhe interessa.
        </Typography>
        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Todos os produtos passarão por análise. Não efetuaremos a troca, e os
          produtos serão devolvidos para o cliente nas seguintes situações:
        </Typography>
        <Typography variant="h6">
          • ¤ Ausência de defeito (não constatação do dano apontado pelo
          cliente).
        </Typography>

        <Typography variant="h6">
          • ¤ Indícios de uso inadequado do produto.
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          • ¤ Indícios de dano acidental ou provocado.
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          Caso o laudo seja favorável a troca/devolução, o cliente receberá
          outro produto sem custos adicionais ou o estorno. Na ausência do mesmo
          modelo em estoque, o cliente será comunicado e poderá escolher outro
          modelo para troca entre as opções existentes no site, respeitando o
          limite do crédito. Se houver diferença de preço para maior entre o
          produto escolhido e o produto devolvido, deverá ser providenciado o
          pagamento da diferença através de depósito bancário ou cartão de
          crédito. Caso você tenha recebido um produto diferente ao que você
          comprou ( tamanho / cor / modelo ) contate imediatamente através do
          e-mail atendimento@krakatoacangas.com.br ou tel (71) 3375-3856.
        </Typography>

        <Typography variant="h1" style={{ paddingBottom: 20 }}>
          Reembolso
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          A restituição do valor do produto será feita de acordo com a forma de
          pagamento escolhida pelo cliente na hora da compra. Caso tenha sido
          cartão de crédito ou boleto bancário, o estorno será feito diretamente
          junto a empresa de cartao de credito, que será o responsável por
          estornar o valor (Compras no cartão de crédito podem demorar até 30
          dias para ser estornada na fatura do cartão, após o cancelamento), e
          compras por boleto o valor ficará disponível em sua conta do PagSeguro
          para que você possa efetuar o saque para uma conta bancaria de sua
          titularidade.
        </Typography>

        <Typography variant="h6">
          • ¤ Caso a compra tenha sido efetuada por deposito o estorno será
          feito na conta bancária do cliente, no prazo de até 48 H após a
          solicitação.
        </Typography>

        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          • ¤ Em casos excepcionais, em que não possa ser feito o estorno no
          cartão de crédito do cliente, será feito o estorno via deposito em
          conta em prazo de até 5 dias uteis, após solicitação.
        </Typography>
        <Typography variant="h1" style={{ paddingBottom: 20 }}>
          Cancelamento Automático de compra
        </Typography>
        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          O cancelamento do pedido e liberação dos produtos adquiridos por
          iniciativa da KRAKATOA será automático nas seguintes situações:
        </Typography>
        <Typography variant="h6">
          • ¤ Impossibilidade de execução do débito correspondente à compra no
          cartão de crédito.
        </Typography>
        <Typography variant="h6">
          • ¤ Inconsistência de dados preenchidos no pedido.
        </Typography>
        <Typography variant="h6">
          • ¤ Não pagamento do boleto bancário.
        </Typography>
        <Typography variant="h6">• ¤ Ausência / Erro em estoque</Typography>
        <Typography variant="h6">
          • ¤ No caso de erro de estoque , entramos em contato com cliente
          oferencendo a troca por outra mercadoria, caso não tenhamos sucesso no
          contato em 24H o pedido é automaticamente cancelado.
        </Typography>
      </Container>
    </>
  );
};

export default withNav(withAnimation(Politicas));
