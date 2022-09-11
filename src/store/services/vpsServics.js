/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vpsApi = createApi({
  reducerPath: 'vpsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.sweb.ru',
  }),
  endpoints: (builder) => ({
    fetchVps: builder.mutation({
      query: () => ({
        url: '/notAuthorized',
        method: 'POST',
        body: JSON.stringify({ jsonrpc: '2.0', method: 'vpsOsConfig', params: {} }),
      }),
    }),
  }),
});
