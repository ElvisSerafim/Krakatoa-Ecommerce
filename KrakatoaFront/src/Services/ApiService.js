/* eslint-disable quote-props */
/* eslint-disable consistent-return */
const ApiService = {
  ListaProdutos: async () => {
    const res = await fetch('http://localhost:4000/api/produtos');
    return res.json();
  },
  GetProdutos: async (data) => {
    try {
      const url = 'http://localhost:4000/api/produtos/query';
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };

      const request = await fetch(url, requestInfo);

      if (request.ok) {
        const response = await request.json();
        return response;
      }

      throw new Error('Não foi possivel conectar com o Server');
    } catch (error) {
      return [];
    }
  },
  Cadastro: async (data) => {
    try {
      const url = 'http://localhost:4000/api/user/';
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };

      const request = await fetch(url, requestInfo);

      if (request.ok) {
        const response = request.json();
        const { token } = response;
        sessionStorage.setItem('token', token);
      }

      throw new Error();
    } catch (error) {
      return error;
    }
  },
  Login: async (data) => {
    try {
      const url = 'http://localhost:4000/api/user/login';
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(url, requestInfo);

      if (request.ok) {
        const response = await request.json();
        const { token } = response;
        const { sessao } = data;
        if (sessao) localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
      }
      throw new Error('Login Invalido');
    } catch (error) {
      return error;
    }
  },
  AtualizaUsuario: async (data) => {
    try {
      const url = 'http://localhost:4000/api/user';
      const { token } = data;
      const requestInfo = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization: `'Bearer ' ${token}`,
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        return request.json();
      }
      throw new Error('Não foi possivel alterar seus dados');
    } catch (error) {
      return error;
    }
  },
  ApagarUsuario: async (email, password) => {
    const res = await (fetch('http://localhost:4000/api/user'),
    {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: {
        email,
        password,
      },
    });
    return res.json();
  },
  Contato: async (data) => {
    try {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(
        'http://localhost:4000/api/contato',
        requestInfo,
      );
      if (request.ok) {
        const res = 'Mensagem Enviada';
        return res;
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
};

export default ApiService;
