import { axiosInstance } from "./core";

const PATH = "/todo";

const TodoApi = {
  async addTodo({ title, content }) {
    const res = await axiosInstance.post(PATH, {
      title,
      content,
    });
    return res.data;
  },
  async getTodo() {
    const res = await axiosInstance.get(PATH);
    return res.data;
  },

  async updateTodo({ id, content, state }) {
    const res = await axiosInstance.put(PATH + `/${id}`, {
      content,
      state,
    });
    return res.data;
  },
  async deleteTodo({ id }) {
    const res = await axiosInstance.delete(PATH + `/${id}`);
    return res.data;
  },
};

export default TodoApi;
