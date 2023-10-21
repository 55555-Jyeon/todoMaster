// 04. reducer

// 04-2. 상태의 기본값 설정해주기 >> context/todo.js 에서 가져오기
const initialState = [
  {
    id: 1,
    title: "example-todo=1",
    content: "example-todo-1",
    state: false,
  },
  {
    id: 2,
    title: "example-todo=2",
    content: "example-todo-2",
    state: false,
  },
];

// 04-1. case의 값들을 객체로 묶어 상수로 내보내기
export const todoAction = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  UPDATE_TODO: "UPDATE_TODO",
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    // Q. todo를 바꿀 수 있는 case에는 무엇이 있는가?
    // A. add, delete, update

    case todoAction.ADD_TODO:
      // 06. return에 로직 넣어주기 (contexts > todo.js )
      return [
        {
          id: Math.floor(Math.random() * 10000),
          title: action.payload.title,
          content: action.payload.content,
        },
        ...state,
      ];

    case todoAction.DELETE_TODO:
      return state.filter((el) => el.id !== action.payload.id);

    case todoAction.UPDATE_TODO:
      const todo = state.find((el) => el.id === action.payload.id);
      todo.content = action.payload.content;
      return state;
    default:
      return state;
  }
};
export default todoReducer;
