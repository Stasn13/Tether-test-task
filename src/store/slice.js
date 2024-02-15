/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { sunscribeOrderBook, unsubscribeOrderBook } from './api';

const initialState = {
  chanId: '',
  books: {},
};

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    setChainId: (state, { payload }) => {
      state.chanId = payload;
    },
    setBookUpdates: (state, { payload }) => {
      const [chanId, books] = payload;

      if (chanId === state.chanId && Array.isArray(books)) {
        const orderBookData = books.reduce((acc, current) => {
          acc[current[0]] = {
            id: current[0],
            price: current[0],
            count: current[1],
            amount: current[2],
          };
          return acc;
        }, {});

        state.books = { ...orderBookData };
      }
    },
    clearDataChainId: (state) => {
      state.chanId = undefined;
    },
  },
});

export const { setBookUpdates, setChainId, clearDataChainId } =
  orderBookSlice.actions;

export const selectChain = (state) => state.chanId;

export const connectApi = (precisionLVL) => (dispatch, getState) => {
  sunscribeOrderBook(precisionLVL, (chanId, data) => {
    const currentChain = selectChain(getState());
    if (!currentChain && chanId) {
      dispatch(setChainId(chanId));
    }

    if (data) {
      dispatch(setBookUpdates(data));
    }
  });
};

export const disconnectApi = () => (dispatch, getState) => {
  const currentChain = selectChain(getState());
  unsubscribeOrderBook(currentChain);
  dispatch(clearDataChainId());
};

export default orderBookSlice.reducer;
