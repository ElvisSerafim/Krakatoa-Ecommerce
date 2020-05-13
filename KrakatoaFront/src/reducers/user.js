import api from '../Services/ApiService';

let a, b = '';
a = localStorage.getItem('token');
b = sessionStorage.getItem('token');

const initialState = {

    token: getToken(),
    user: ''
};

function getToken() {

    if (a != null) {
        return a;
    } else if (b !=  null) {
        return b;
    }

    return '';
}

async function tentativa() {
     function getUser() {
        if (a != null) {
            const data = {
                token: a
            }
            const agora =  api.getUsuario(data).then((data) => {return data});
            return agora;
        }
       else if (b != null) {
            const usuario = api.getUsuario(b);
            return usuario;
        }

        return '';
    }

    const retorno = await getUser();
    return retorno;
}


export default async function user(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            var usuario = await tentativa();
            return {...state, user: usuario};
    }
}

export const setUser = (payload) => ({
    type: 'SET_USER',
    payload
});
