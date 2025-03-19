import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import Clock from './Clock';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string;
  priority: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: { text: string; category: string; dueDate: string; priority: string }) => {
    if (todo.text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: todo.text.trim(),
        completed: false,
        category: todo.category,
        dueDate: todo.dueDate,
        priority: todo.priority,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter todos based on search term and filters
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || todo.category === categoryFilter;
    const matchesPriority = !priorityFilter || todo.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Get unique categories for the filter dropdown
  const categories = ['Work', 'Personal', 'Shopping', 'Health'];
  const priorities = ['P1', 'P2', 'P3', 'P4'];

  return (
    <div className="todo-list">
      <h1 className="app-title">Todo App</h1>
      <Clock />
      <TodoForm addTodo={addTodo} categories={categories} />
      
      <div className="todo-filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-selects">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Priorities</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="todos">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">No tasks match your filters.</p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </div>
      <div className="todo-stats">
        <p>{todos.filter(todo => !todo.completed).length} tasks remaining</p>
        {todos.some(todo => todo.completed) && (
          <button 
            onClick={clearCompleted}
            className="clear-completed"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList; 