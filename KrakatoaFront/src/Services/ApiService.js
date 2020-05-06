const ApiService = {
  ListaProdutos: async () => {
    const res = await fetch('http://localhost:4000/api/produtos');
    return res.json();
  },
  CriaUsuario: async (email, password) => {
    const res = await (fetch('http://localhost:4000/api/user/cadastro'),
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: {
        email,
        password,
      },
    });
    return res.json();
  },
  AtualizaUsuario: async (
    email,
    password,
    nome,
    telefone,
    cpf,
    newPassword,
    _id,
  ) => {
    const res = await (fetch('http://localhost:4000/api/user'),
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: {
        email,
        password,
        nome,
        telefone,
        cpf,
        newPassword,
        _id,
      },
    });
    return res.json();
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
  Login: async () => {
    const res = await fetch('http://localhost:4000/api/user/login');
    return res.json();
  },
  Contato: async (data) => {
    await (fetch('http://localhost:4000/api/contato'),
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      if (response.ok) return response.json();
      throw new Error('Não foi possivel acessar o servidor');
    }).catch((e) => console.log(e));
  },
};

export default ApiService;
