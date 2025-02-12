import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class TaskService {
  private storageKey = 'tasks';

  constructor() {}

  /** Get all tasks from localStorage */
  getTasks(): any[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  /** Save tasks to localStorage */
  saveTasks(tasks: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  /** Get a single task by its ID */
  getTaskById(taskId: number): any | null {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === taskId) || null;
  }

  /** Add a new task */
  addTask(task: any): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  /** Update an existing task */
  updateTask(updatedTask: any): void {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      this.saveTasks(tasks);
    }
  }

  /** Delete a task by its ID */
  deleteTask(taskId: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    this.saveTasks(tasks);
  }
}
