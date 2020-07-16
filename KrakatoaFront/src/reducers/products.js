import { createSlice } from '@reduxjs/toolkit';


const productsPage = createSlice({
  name: 'productsPage',
  initialState: [],
  reducers: {
    updateProducts: (state, action) => {
      return action.payload;
    }
  }
})

export default productsPage.reducer;
export const {updateProducts} = productsPage.actions;
