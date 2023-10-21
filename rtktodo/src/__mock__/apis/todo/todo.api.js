// 01. create file (__mock__ > apis > todo > todo.api.js )

import { rest } from "msw";

export const getTodos = rest.get("/api/todo", (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        title: "title",
        content: "example",
        status: false,
      },
      {
        id: 2,
        title: "title",
        content: "example",
        status: false,
      },
    ])
  );
});
