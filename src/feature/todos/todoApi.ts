import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

type QueryParams = {
  limit?: number;
  skip?: number;
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], QueryParams>({
      query: ({ limit = 10, skip = 0 }) => {
        return {
          url: "todos",
          params: { limit, skip },
        };
      },
      transformResponse: (response: { todos: Todo[] }) => response.todos,
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;
