import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthService } from '../../auth/auth.sevice';
import { Router } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  selectedPriority: string = 'All';

  constructor(private authService: AuthService, private router: Router, private taskService: TaskService) {
    // if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login']); // Redirect if not logged in
    // }
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    console.log('logged in')
    this.filterTasks();
  }

  filterTasks() {
    if (this.selectedPriority === 'All') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.priority === this.selectedPriority);
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  toggleCompletion(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.taskService.updateTask(task.id, task);
      this.filterTasks();
    }
  }

  navigateToTaskForm(): void {
    this.router.navigate(['/tasks/create']); // Navigate to Task Form Page
  }

  addTaskToList(newTask: any) {
    this.tasks.push(newTask);
    this.filterTasks();
  }



  // toggleCompletion(taskId: number) {
  //   const task = this.tasks.find(t => t.id === taskId);
  //   if (task) {
  //     task.completed = !task.completed;
  //   }
  // }

  // deleteTask(taskId: number) {
  //   this.tasks = this.tasks.filter(task => task.id !== taskId);
  //   this.filterTasks();
  // }

  // Handle drag-and-drop task reordering

  drop(event: CdkDragDrop<Task[]>): void {
    // Update the order of tasks in the filteredTasks array
    moveItemInArray(this.filteredTasks, event.previousIndex, event.currentIndex);

    // Update the tasks array to match the new order
    this.tasks = [...this.filteredTasks];

    // Save the updated order in local storage
    this.taskService.saveTasks(this.tasks);
  }

}
