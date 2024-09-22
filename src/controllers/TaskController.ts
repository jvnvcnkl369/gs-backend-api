// controllers/TaskController.ts
import { Request, Response } from "express";
import { TaskService } from "../services/TaskService.js";
import { AppDataSource } from "../data-source.js";
import { Task } from "../models/Task.js";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService(AppDataSource.getRepository(Task));
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, priority, status } = req.body;
      const userId = req['user'].id; 
      if (!title || !description || !priority || !status) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const task = await this.taskService.createTask(userId, { title, description, priority, status });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const userId = req['user'].id;

      const task = await this.taskService.getTask(userId, taskId);
      res.json(task);
    } catch (error) {
      if (error.message === "Task not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = req['user'].id;

      const tasks = await this.taskService.getAllTasks(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const userId = req['user'].id;
      const updatedData = req.body;

      const task = await this.taskService.updateTask(userId, taskId, updatedData);
      res.json(task);
    } catch (error) {
      if (error.message === "Task not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const userId = req['user'].id;

      await this.taskService.deleteTask(userId, taskId);
      res.status(204).end();
    } catch (error) {
      if (error.message === "Task not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}