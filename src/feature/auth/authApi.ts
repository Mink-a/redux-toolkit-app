import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LoginDto = {
  username: string;
  password: string;
};

type LoginResponse = {
  username: string;
  token: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginDto) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: LoginResponse) => {
        const { username, token } = response;
        return { username, token };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
