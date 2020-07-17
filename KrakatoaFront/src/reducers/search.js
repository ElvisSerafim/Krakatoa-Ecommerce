
import { createSlice } from '@reduxjs/toolkit';

const search = createSlice({
  name: 'search',
  initialState: {},
  reducers: {
    sendSearch: (state, action) => {
      state.pesquisa = action.payload;
    }
  }
})

export default search.reducer;
export const {sendSearch} = search.actions;
