import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const initialState = {
  customers: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      const newCustomer = { ...action.payload, id: uuidv4() }; 
      state.customers.push(newCustomer);
    },
    updateCustomer: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.customers.findIndex(customer => customer.id === id);
      if (index !== -1) {
        state.customers[index] = { ...state.customers[index], ...updatedData };
      }
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;