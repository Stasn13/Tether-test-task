/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { sunscribeOrderBook, unsubscribeOrderBook } from './api';

const initialState = {
  chanId: '',
  books: {
    bids: {},
    asks: {},
  },
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
        const orderBookData = books.reduce(
          (acc, currentBook) => {
            const [price, count, amount] = currentBook;
            if (count === 0) {
              if (amount === 1) delete acc.bids[price];
              if (amount === -1) delete acc.asks[price];
            }
            if (count > 0) {
              if (amount > 0) acc.bids[price] = { price, count, amount };
              if (amount < 0) acc.asks[price] = { price, count, amount };
            }

            return acc;
          },
          { asks: {}, bids: {} },
        );

        state.books.asks = { ...state.books.asks, ...orderBookData.asks };
        state.books.bids = { ...state.books.bids, ...orderBookData.bids };
      }
    },
    clearDataChainId: (state) => {
      state.chanId = undefined;
    },
    clearBooks: (state) => {
      state.books = initialState.books;
    },
  },
});

export const { setBookUpdates, setChainId, clearDataChainId, clearBooks } =
  orderBookSlice.actions;

export const selectChain = (state) => state.chanId;

export const connectApi = (precisionLVL) => (dispatch, getState) => {
  sunscribeOrderBook(precisionLVL, (chanId, data) => {
    const currentChain = selectChain(getState());
    if (!currentChain && chanId) {
      dispatch(setChainId(chanId));
      dispatch(clearBooks());
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
