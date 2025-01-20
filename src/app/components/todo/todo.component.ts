import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../model/todo.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  todos: ITodo[] = []
  newTodoInput: Partial<ITodo> = {
    title: '',
    description: ''
  }

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos)
    }
  }

  addTodo() {
    if (this.newTodoInput.title?.trim() && this.newTodoInput.description?.trim()) {
      const newTodo: ITodo = {
        id: Date.now(),
        title: this.newTodoInput.title,
        description: this.newTodoInput.description,
        completed: false
      }
      this.todos.push(newTodo)
      this.saveTodo()
      this.newTodoInput = {
        title: '',
        description: ''
      }
    }
  }

  toggleCompleted(todo: ITodo) {
    todo.completed = !todo.completed
    this.saveTodo()
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
    this.saveTodo()
  }

  editTodo(newTodo: ITodo) {
    if (newTodo.title?.trim() && newTodo.description?.trim()) {
      this.deleteTodo(newTodo.id)
      this.newTodoInput = {
        title: newTodo.title,
        description: newTodo.description
      }
      this.saveTodo()
    }
  }

  saveTodo() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

}
