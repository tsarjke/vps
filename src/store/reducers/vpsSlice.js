/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vpsInfo: {
    // vpsPlans: [],
    // selectOs: [],
    // selectPanel: [],
    // osPanelL: [],
    // datacenters: [],
    // categories: [],
  },
  filter: {},
  order: [],
};

export const todoSlice = createSlice({
  name: 'vps',
  initialState,
  reducers: {
    addVpsInfo(state, action) {
      state.vpsInfo = { ...action.payload };
    },
    setFilter(state, action) {
      state.filter = { ...action.payload };
    },
    setOrder(state, action) {
      state.order.push(action.payload);
    },
  },
});

export default todoSlice.reducer;
export const { addVpsInfo, setFilter, setOrder } = todoSlice.actions;
