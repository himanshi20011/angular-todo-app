import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  taskData: Task = {
    id: 0,
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    completed: false,
  };

  constructor(private taskService: TaskService, private router: Router) {}

  

  onSubmit(): void {
    this.taskData.id = Date.now(); // Generate unique ID
    this.taskService.addTask(this.taskData);
    this.router.navigate(['/tasks']); // Redirect to Task List page
  }
}
