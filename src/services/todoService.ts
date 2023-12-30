import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

const todoService = {
  getAll: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get('/todos');
    return response?.data;
  },

  getTodoById: async (id: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(`/todos/${id}`);
    return response?.data;
  },

  create: async (todo: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.post('/todos/create/', todo);
    return response?.data;
  },

  update: async (todo: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.put(`/todos/update/${todo.id}`, todo);
    return response?.data;
  },
};

export default todoService;
