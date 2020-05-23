import React from 'react';
import Grid from '@material-ui/core/Grid';

<Grid
  container
  item
  lg={7}
  md={7}
  sm={12}
  xs={12}
  spacing={2}
  justify="space-around"
  style={{
    paddingTop: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  }}
>
  <Grid
    container
    spacing={2}
    lg={12}
    md={12}
    sm={12}
    xs={12}
    spacing={2}
    justify="center"
    direction="row"
  >
    <Grid item lg={6} md={6} sm={6} xs={6}>
      <TextField
        type="password"
        label="Senha Atual"
        style={styles.pass}
        value={pass}
        onChange={(event) => {
          setPass(event.target.value);
        }}
      />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={6}>
      <TextField
        color="primary"
        label="Nome"
        defaultValue="Gustavo Santos"
        style={styles.nome}
        value={nome}
        onChange={(event) => {
          setNome(event.target.value);
        }}
      />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={6}>
      <TextField
        style={styles.newpass}
        type="password"
        label="Nova Senha"
        value={newPass}
        onChange={(event) => {
          setNewPass(event.target.value);
        }}
      />
    </Grid>
    <Grid item lg={6} md={6} sm={6} xs={6}>
      <FormControl style={styles.tel}>
        <InputLabel
          style={{ fontSize: '1.25em' }}
          htmlFor="formatted-text-mask-input"
        >
          Telefone
        </InputLabel>
        <Input
          defaultValue={values.default}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          value={tel}
          onChange={(event) => {
            setTel(event.target.value);
          }}
          inputComponent={TextMaskCustom}
        />
      </FormControl>
    </Grid>
  </Grid>
  <Grid item lg={12} container justify="flex-end">
    <Button
      style={styles.botao}
      onClick={() => {
        setToken(sessionStorage.getItem('token'));
        enviar();
        setOpen(true);
        setStatus('sucess');
        switch (true) {
          case newPass.length > 0:
            if (pass === '') setMessage('Senha vazio');
            /*
                        VERIFICAR SE A SENHA ATUAL ESTÁ CERTA
                      */

            setStatus('sucess');
            setMessage('Alterações salvas!');

            /*
                      SE ESTIVER CERTA, RODAR O CÓDIGO ABAIXO:
                    */
            // ATUALIZAR A SENHA PARA NEWPASS
            break;
          case nome.length === 0:
            setStatus('error');
            setMessage('Você deve botar seu nome!');
            break;
          case tel.replace(/[^0-9]/g, '').length !== 11 && tel !== '&366&':
            setStatus('error');
            setMessage(
              'Você deve inserir um número de telefone válido com DDD',
            );
            break;
          default:
            setMessage('Alterações salvas!');
            setStatus('success');
            // ATUALIZAR O NOME DO USARIO
            // ATUALIZAR O TELEFONE DO USARIO
            break;
        }
      }}
      variant="contained"
      color="primary"
    >
      SALVAR
    </Button>
  </Grid>
</Grid>;
