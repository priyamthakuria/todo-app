import React from 'react';
import { Todo } from './TodoList';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span className="todo-text">{todo.text}</span>
      <button 
        onClick={() => deleteTodo(todo.id)}
        className="delete-button"
        aria-label={`Delete "${todo.text}"`}
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem; 