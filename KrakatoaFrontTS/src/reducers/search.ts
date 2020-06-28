const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'SEARCH') {
    return action.payload;
  }
  return state;
}

export const sendSearch = (payload) => ({
  type: 'SEARCH',
  payload,
});
