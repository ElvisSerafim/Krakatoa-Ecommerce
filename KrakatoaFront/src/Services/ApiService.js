/* eslint-disable quote-props */
/* eslint-disable consistent-return */
const ApiService = {
  ListaProdutos: async () => {
    try {
      const url = 'http://64.227.106.165/api2/produto/';
      const requestInfo = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        const response = await request.json();
        return response;
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return error;
    }
  },
  GetProdutos: async (data) => {
    try {
      const url = 'http://64.227.106.165/api/produtos/query';
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
      const url = 'http://64.227.106.165/api/user/';
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
      const url = 'http://64.227.106.165/api/user/login';
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
        await sessionStorage.setItem('token', token);
        const ok = 'ok';
        return ok;
      }
      throw new Error('Login Invalido');
    } catch (error) {
      return error;
    }
  },
  AtualizaUsuario: async (data) => {
    try {
      const url = 'http://64.227.106.165/api/user/me';
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
      const url = 'http://64.227.106.165/api/user/me/endereco';
      const { token } = data;
      const Authorization = `Bearer ${token}`;
      const requestInfo = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization,
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
  ApagarUsuario: async (email, password) => {
    const res = await (fetch('http://64.227.106.165/api/user'),
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
        'http://64.227.106.165/api/contato',
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
  Logout: async (data) => {
    try {
      const { token } = data;
      const Authorization = `Bearer ${token}`;
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization,
          'Content-Type': 'application/json',
        }),
      };
      const url = 'http://64.227.106.165/api/user/me/logout';
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
      const url = 'http://64.227.106.165/api/user/me/';
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

  getPedidos: async (data) => {
    try {
      const { token } = data;
      const Authorization = `Bearer ${token}`;
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization,
          'Content-Type': 'application/json',
        }),
      };
      const url = 'http://64.227.106.165/api/pedidos';
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        return request.json();
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
};

export default ApiService;
