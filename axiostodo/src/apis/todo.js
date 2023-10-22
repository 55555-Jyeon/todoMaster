// 26. DI
// 데이터를 보내는 방법은 백엔드가 지정해 알려줌

const { axiosInstance } = require("./core");

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

  // id는 query string방식으로  content, state은 body로 보낼 것
  async updateTodo({ id, content, state }) {
    const res = await axiosInstance.put(PATH + `/${id}`, {
      content,
      state,
    });
    return res.data;
  },
  async deleteTodo({ id }) {
    // const res = await axiosInstance.delete(PATH, { params: { todoId: id } });
    // 위와 같이 구현할 수도 있음. 단, 백엔드에서 구현한 로직에 맞춰야 하므로 아래로 진행
    const res = await axiosInstance.delete(PATH + `/${id}`);
    return res.data;
  },
};

export default TodoApi;
