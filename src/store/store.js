/* eslint-disable import/prefer-default-export */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { vpsApi } from './services/vpsServics';
import vpsReducer from './reducers/vpsSlice';

const rootReducer = combineReducers({
  vpsReducer,
  [vpsApi.reducerPath]: vpsApi.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vpsApi.middleware),
});
