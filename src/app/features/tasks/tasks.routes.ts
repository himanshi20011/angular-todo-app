import { Route } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

export const TASKS_ROUTES: Route[] = [
  { path: '', component: TaskListComponent },
  { path: 'details/:id', component: TaskDetailsComponent },
];
