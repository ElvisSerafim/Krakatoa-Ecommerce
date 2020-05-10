/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography } from '@material-ui/core/';
import { updateProducts } from '../reducers/products';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import ComboBox from '../components/ComboBox';
import Paginator from '../components/Paginator';
import Footer from '../components/Footer';
import api from '../Services/ApiService';


const Produtos = ({ title, name }) => {
  const [product, setProduct] = useState([]);
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const data = {
        tipo: name,
        chave: '',
      };

      const request = await api.GetProdutos(data);

      const a = [request];
      setProduct(a);
    };

    getProducts();
  }, []);
  const dispatch = useDispatch();
  dispatch(updateProducts(product));


  const ordenar = async (value) => {
    let chave = '';
    if (value === '') return;
    if (value === 'Mais vendidos') chave = 'maiorV';
    if (value === 'Menor Preço') chave = 'menorP';
    if (value === 'Maior Preço') chave = 'maiorP';

    const data = {
      tipo: name,
      chave,
    };
    const request = await api.GetProdutos(data);
    const b = [request];
    setProduct(b);
    dispatch(updateProducts(b));
  };


  return (

    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <Typography variant="h2" color="primary">
          {title}
        </Typography>
        <div
          style={{
            display: 'flex',
            width: '98%',
            paddingBottom: '20px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <ComboBox
            onChange={(event) => {
              setOrderBy(event.target.value);
              console.log(event.target.value);
              ordenar(event.target.value);
            }}
            style={{ width: 300 }}
            value={orderBy}
            items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
            label="Ordenar por: "
          />
        </div>
        <ProductList products={product} title={title} />
        <div style={{ marginTop: '50px' }}>
          <Paginator />
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default Produtos;
/*
export default class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      orderBy: '',
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const { name } = this.props;
    const data = {
      tipo: name,
      chave: '',
    };

    const request = await api.GetProdutos(data);

    const a = [request];
    this.setState({ product: a });
  }

  async orderBy(value) {
    const { name } = this.props;

    let chave = '';
    if (value === '') return;
    if (value === 'Mais vendidos') chave = 'maiorV';
    if (value === 'Menor Preço') chave = 'menorP';
    if (value === 'Maior Preço') chave = 'maiorP';

    const data = {
      tipo: name,
      chave,
    };
    const dispatch = useDispatch()
    const request = await api.GetProdutos(data);

    const b = [request];
    this.setState({ product: b });
    dispatch(updateProducts(b));
  }

  render() {
    const { title } = this.props;
    const { orderBy, product } = this.state;
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography variant="h2" color="primary">
            {title}
          </Typography>
          <div
            style={{
              display: 'flex',
              width: '98%',
              paddingBottom: '20px',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ComboBox
              onChange={(event) => {
                this.setState({ orderBy: event.target.value });
                this.orderBy(event.target.value);
              }}
              style={{ width: 300 }}
              value={orderBy}
              items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
              label="Ordenar por: "
            />
          </div>
          <ProductList products={product} />
          <div style={{ marginTop: '50px' }}>
            <Paginator />
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
 */
