import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksKey = 'tasks'; // Key for storing tasks in localStorage

  constructor() { }

  /** Get tasks from localStorage */
  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.tasksKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  /** Save tasks to localStorage */
  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  /** Add a new task */
  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }


  /** Get a single task by its ID */
  getTaskById(taskId: number): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find((task) => task.id === taskId);
  }

  /** Delete a task by its ID */
  deleteTask(taskId: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    this.saveTasks(tasks);
  }

  /** Update an existing task */
  updateTask(taskId: number, updatedTask: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
    }
  }




}
