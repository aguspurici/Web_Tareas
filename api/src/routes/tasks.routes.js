import { Router } from "express";
import { authRequired } from "../middlewares/validate.token.js";
import {
  getTasks,
  getTasksById,
  updateTasks,
  deleteTasks,
  createTasks,
} from "../controllers/tasks.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);

router.get("/tasks/:id", authRequired, getTasksById);

router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTasks
);

router.delete("/tasks/:id", authRequired, deleteTasks);

router.put("/tasks/:id", authRequired, updateTasks);

export default router;
