/* Pagina de Contato
 */


import React, { PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ContatoStyle from '../components/Contato.css';
const styles = {
      title: {
        fontSize:"3.75em",
        textAlign:"center",
        margin: "64px",
        color: "#FF5757",
      },
      default :{
        fontSize:"2.25em",
        fontWeight: '1000',
        color: "#FF5757",
      },
      name: {
        backgroundColor: 'gray',
        color: "#FF5757",
        width: '30%',
        height: '50px',
      }
}


export default class Contato extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <section>
            <Typography style={styles.title}>Contato</Typography>
          </section>
          <section>
          <Typography style={styles.default}>FALE CONOSCO</Typography> 
          </section>
          <form>
              <label>
                {/* <input className={ContatoStyle} type = "text" name = "name" placeholder = "Nome*" style={styles.name}/>
                <input className={ContatoStyle} type = "text" name = "name" placeholder = "Nome*" style={styles.name}/>
                <input className={ContatoStyle} type = "text" name = "name" placeholder = "Nome*" style={styles.name}/> */}
              </label>
          </form>
        </Container>
      </>
    );
  }
}

