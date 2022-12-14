/* eslint-disable quote-props */
/* eslint-disable consistent-return */
const URL = "https://krakatoacangas.com.br/api2/";

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
        return accessToken;
      }
      return Error('Erro Na hora de Cadastrar');
    } catch (error) {
      return error;
    }
  },
  Login: async (data) => {
    try {
      const url = `${URL}user/login`;
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
      const url = `${URL}user/detalhes`;
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
        return 'ok';
      }
      throw new Error('Não foi possivel alterar seus dados');
    } catch (error) {
      return error;
    }
  },
  UsuarioEndereco: async (data) => {
    try {
      const url = `${URL}user/`;
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
        return 'ok';
      }
      throw new Error('Não foi possivel continuar com a compra');
    } catch (error) {
      return error;
    }
  },
  /* ApagarUsuario: async (data) => {
    const { token } = data;
    const Authorization = `Bearer ${token}`;
    const url = `${URL}user'`;
    const requestInfo = {
      method: 'DELETE',
      headers: new Headers({
        Authorization,
        'Content-Type': 'application/json',
      }),
    };
    const res = await fetch(url, requestInfo);
    if (res.ok) return res.json();
  }, */
  Contato: async (data) => {
    try {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const request = await fetch(`${URL}contato`, requestInfo);
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
        "https://krakatoacangas.com.br/api/calcPrazo",
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
      const url = "https://krakatoacangas.com.br/api/calcFrete";
      console.log(url);
      const request = await fetch(url, requestInfo);
      const response = await request.json();
      return response;
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
  getUsuario: async (data) => {
    try {
      const url = `${URL}user/`;
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
      const url = `${URL}pedidos`;
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
      const url = `${URL}pedidos/`;
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        return request.json();
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
  RecuperarSenha: async (data) => {
    try {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const url = `${URL}user/forgot`;
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        return 'ok';
      }
      throw new Error('Não foi possivel acessar o servidor');
    } catch (error) {
      return 'Não foi possivel acessar o servidor';
    }
  },
  RedefinirSenha: async (data) => {
    try {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const url = `${URL}user/recover`;
      const request = await fetch(url, requestInfo);
      if (request.ok) {
        const response = await request.json();
        return response;
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
