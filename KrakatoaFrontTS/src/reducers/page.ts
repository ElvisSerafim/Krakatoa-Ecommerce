//@ts-nocheck
const INITIAL_STATE = 0;
//@ts-ignore
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'CURRENT_PAGE') {
    return action.index;
  }
  return state;
}

export const currentPage = (index) => ({
  type: 'CURRENT_PAGE',
  index
});
