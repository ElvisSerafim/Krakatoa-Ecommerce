import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const {
    url,
    method,
    headers,
    onStart,
    onSuccess,
    onError,
    data,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: 'https://64.227.106.165/api2/',
      url,
      timeout: 2000,
      method,
      data,
      headers,
    });
    // Geral
    dispatch(actions.apiCallSuccess(response.data));

    // Especifica
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // Geral
    dispatch(actions.apiCallFail(error));
    // Especifica
    if (onError) dispatch({ type: onError, payload: error.mensage });
  }
};
export default api;

/* const action = {
  type: 'apiCallBegan',
  payload: {
    url: '/produto',
    method: 'get',
    data: {},
    header: {},
    onSuccess: 'produtosReceived',
    onError: 'produtosRequestFaild',
  },
}; */
