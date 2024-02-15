import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './slice';

const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
});

export default store;
