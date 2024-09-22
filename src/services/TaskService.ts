import { DeleteResult, Repository } from "typeorm";
import { Task } from "../models/Task";

export class TaskService {
    public taskRepository: Repository<Task>
    constructor(taskRepository: Repository<Task>) {
      this.taskRepository = taskRepository
    }
  
    async createTask(userId: string, taskData: Partial<Task>): Promise<Task> {
      try {
        const task = this.taskRepository.create({ ...taskData, userId });
        return this.taskRepository.save(task);
      } catch (error) {
        throw new Error('Failed to create task: ' + error.message);
      }
    }
  
    async getTask(userId: string, taskId: string): Promise<Task | undefined> {
      try {
        const task = await this.taskRepository.findOne({ where: { id: Number(taskId), userId } });
        if (!task) {
          throw new Error('Task not found');
        }
        return task;
      } catch (error) {
        throw new Error('Failed to get task: ' + error.message);
      }
    }
  
    async getAllTasks(userId: string): Promise<Task[] | Error> {
      try {
        const tasks = await this.taskRepository.find({ where: { userId } });
        return tasks;
      } catch (error) {
        throw new Error('Failed to get all tasks: ' + error.message);
      }
    }
  
    async updateTask(userId: string, taskId: string, updatedData: Partial<Task>): Promise<Task | Error> {
      try {
        const task = await this.taskRepository.update({ id: Number(taskId), userId }, updatedData);
        if (!task) {
          throw new Error('Task not found');
        }
        return await this.taskRepository.findOne({ where: { id: Number(taskId), userId } });
      } catch (error) {
        throw new Error('Failed to update task: ' + error.message);
      }
    }
  
    async deleteTask(userId: string, taskId: string): Promise<DeleteResult | Error> {
      try {
        const result = await this.taskRepository.delete( {userId, id: Number(taskId)});
        if (!result) {
          throw new Error('Task not found');
        }
        return result;
      } catch (error) {
        throw new Error('Failed to delete task: ' + error.message);
      }
    }
  }
  