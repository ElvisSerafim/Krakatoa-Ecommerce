/* eslint-disable quote-props */
/* eslint-disable consistent-return */
const URL = 'http://64.227.106.165/api2/';
const ApiService = {
  Cadastro: async (data) => {
    try {
      const url = `${URL}user/`;
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
        const { accessToken } = await response;

        sessionStorage.setItem('token', accessToken);
        const ok = 'ok';
        return ok;
      }
      return Error('Erro Na hora de Cadastrar');
    } catch (error) {
      return error;
    }
  },
  Login: async (data) => {
    try {
      const url = 'http://64.227.106.165/api2/user/login';
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
        const { accessToken } = response;
        return accessToken;
      }
      throw new Error('Login Invalido');
    } catch (error) {
      return error;
    }
  },
  AtualizaUsuario: async (data) => {
    try {
      const url = 'http://64.227.106.165/api2/user/detalhes';
      const { token } = data;
      const requestInfo = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization: `Bearer ${token}`,
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
  UsuarioEndereco: async (data) => {
    try {
      const url = 'http://64.227.106.165/api2/user/';
      const { token } = data;
      const requestInfo = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        return request.json();
      }
      throw new Error('Não foi possivel continuar com a compra');
    } catch (error) {
      return error;
    }
  },
  ApagarUsuario: async (data) => {
    const { token } = data;
    const Authorization = `Bearer ${token}`;
    const url = 'http://64.227.106.165/api2/user';
    const requestInfo = {
      method: 'DELETE',
      headers: new Headers({
        Authorization,
        'Content-Type': 'application/json',
      }),
    };
    const res = await fetch(url, requestInfo);
    if (res.ok) return res.json();
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
        'http://64.227.106.165/api2/contato',
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
  CalcPrazo: async (data) => {
    try {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(
        'http://64.227.106.165/api/calcPrazo',
        requestInfo,
      );
      if (request.ok) {
        const response = await request.json();
        return response;
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
  CalcPrazoPreco: async (data) => {
    try {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const url = 'http://64.227.106.165/api/calcPrazoPreco';
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        return request.json();
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
  getUsuario: async (data) => {
    try {
      const url = 'http://64.227.106.165/api2/user/';
      const { token } = data;
      const requestInfo = {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        const response = await request.json();
        return response;
      }
      throw new Error('Não foi possivel accessar seus dados');
    } catch (error) {
      return error;
    }
  },

  getPedidos: async (token) => {
    try {
      const requestInfo = {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      };
      const url = 'http://64.227.106.165/api2/pedidos';
      const request = await fetch(url, requestInfo);

      if (request.ok) {
        return request.json();
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },

  enviarPedido: async (data) => {
    try {
      const Authorization = `Bearer ${data.token}`;
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization,
          'Content-Type': 'application/json',
        }),
      };
      const url = 'http://64.227.106.165/api2/pedidos/';
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        return request.json();
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },

  getLocalEntrega: async (cep) => {
    try {
      const requestInfo = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      const request = await fetch(url, requestInfo);
      return request.json();
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
};

export default ApiService;
