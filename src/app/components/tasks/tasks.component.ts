import { Component, OnInit } from '@angular/core';
import { ITask } from '../../model/task.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: ITask[] = []

  newTaskInput: ITask = {
    title: '',
    description: '',
    priority: 'Medium',
  }

  // Filter methods
  statusFilter: 'All' | 'Completed' | 'Pending' = 'All';
  priorityFilter: 'All' | 'High' | 'Medium' | 'Low' = 'All';

  // Get data from the localstorage on component initialization
  ngOnInit(): void {
    try {
      const savedTasks = localStorage.getItem('tasks')
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks)
      }
    } catch (err) {
      alert('Failed to fetch tasks from the localstorage')
      console.error(err)
    }
  }

  // Add task 
  addTask() {
    if (this.newTaskInput.title?.trim() && this.newTaskInput.description?.trim()) {
      const newTask: ITask = {
        id: Date.now(),
        title: this.newTaskInput.title,
        description: this.newTaskInput.description,
        priority: this.newTaskInput.priority,
        completed: false
      }
      this.tasks.push(newTask)
      this.saveTask()
      this.resetNewTaskInput()
    } else {
      alert('Fields cannot be empty!')
    }
  }

  // Toggle task 
  toggleCompleted(task: ITask) {
    if (task) {
      task.completed = !task.completed
      this.saveTask()
    } else {
      alert('failed to toggle')
    }
  }

  // Delete task 
  deleteTask(id: number | undefined) {
    if (id === undefined) {
      alert('failed to delete')
      return
    }
    this.tasks = this.tasks.filter(task => task.id !== id)
    this.saveTask()
  }

  // Edit task 
  editTask(newTask: ITask) {
    if (newTask.title?.trim() && newTask.description?.trim()) {
      this.deleteTask(newTask.id)
      this.newTaskInput = {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
      }
      this.saveTask()
    } else {
      alert('task not found for editing')
    }
  }

  // Save task to localstorage
  saveTask() {
    try {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    } catch (err) {
      alert('failed to save localstorage')
      console.error(err)
    }
  }

  //get filtered task 
  getFilteredTask() {
    let filtertasks = this.tasks

    // Status filter
    if (this.statusFilter === 'Completed') {
      filtertasks = filtertasks.filter(task => task.completed === true)
    } else if (this.statusFilter === 'Pending') {
      filtertasks = filtertasks.filter(task => task.completed === false)
    }

    //Priority filter
    if (this.priorityFilter !== 'All') {
      filtertasks = filtertasks.filter(task => task.priority === this.priorityFilter)
    }

    return filtertasks
  }

  // Clear all completed tasks
  clearCompletedTask() {
    try {
      this.tasks = this.tasks.filter(task => !task.completed)
      this.saveTask()
    } catch (err) {
      alert('failed to delete')
      console.error(err)
    }
  }

  // Reset the task inputs
  resetNewTaskInput() {
    this.newTaskInput = {
      title: '',
      description: '',
      priority: 'Medium',
    }
  }

}


