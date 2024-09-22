import { Router } from 'express';
import { register, login } from './controllers/UserController.js'
import { TaskController } from './controllers/TaskController.js';
import { authenticateJWT } from './middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

const taskController = new TaskController();

router.post("/tasks", authenticateJWT, taskController.createTask.bind(taskController));
router.get("/tasks/:taskId",authenticateJWT, taskController.getTask.bind(taskController));
router.get("/tasks",authenticateJWT, taskController.getAllTasks.bind(taskController));
router.put("/tasks/:taskId",authenticateJWT, taskController.updateTask.bind(taskController));
router.delete("/tasks/:taskId",authenticateJWT, taskController.deleteTask.bind(taskController));

export default router;
