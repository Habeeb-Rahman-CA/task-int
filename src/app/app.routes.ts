import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';

export const routes: Routes = [
    { path: '', redirectTo: 'todo', pathMatch: 'full' },
    { path: '**', redirectTo: 'todo', pathMatch: 'full' },
    { path: 'todo', component: TasksComponent }
];
