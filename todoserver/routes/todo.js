import express from "express";
import { jwtAuth } from "../middlewares/jwtAuth.js";
import { TodoService } from "../services/todoService.js";
const router = express.Router();

router.post("/", TodoService.create);
router.get("/", TodoService.read);
router.put("/:todoId", TodoService.update);
router.delete("/:todoId", TodoService.delete);

export default router;
