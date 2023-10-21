import logo from "./logo.svg";
import "./App.css";
import { worker } from "./__mock__/browser";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "./store/store";
import Todo from "./components/todo";

function App() {
  // 04. import worker
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }

  // 05. 잘 실행되나 확인해보기
  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then((result) => console.log(result));
  });

  return (
    /* 07. import Provider (npm i react-redux) */
    <Provider store={store}>
      {/* 14. */}
      <Todo />
    </Provider>
  );
}

export default App;
