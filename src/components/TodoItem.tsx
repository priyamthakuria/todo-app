import React from 'react';
import { Todo } from './TodoList';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1':
        return 'var(--priority-1)';
      case 'P2':
        return 'var(--priority-2)';
      case 'P3':
        return 'var(--priority-3)';
      case 'P4':
        return 'var(--priority-4)';
      default:
        return 'var(--priority-4)';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    // Otherwise return formatted date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <label className="todo-checkbox-label">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="todo-checkbox"
          />
          <span className="checkbox-custom" />
        </label>
        <div className="todo-info">
          <div className="todo-text-row">
            <span 
              className="priority-dot"
              style={{ backgroundColor: getPriorityColor(todo.priority) }}
            />
            <span className="todo-text">{todo.text}</span>
          </div>
          <div className="todo-details">
            {todo.category && (
              <span className="category-tag">
                {todo.category}
              </span>
            )}
            {todo.dueDate && (
              <span className="date-tag">
                <span className="date-icon">📅</span> {formatDate(todo.dueDate)}
              </span>
            )}
            <span className="priority-tag" style={{ color: getPriorityColor(todo.priority) }}>
              {todo.priority}
            </span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => deleteTodo(todo.id)}
        className="delete-button"
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem; 