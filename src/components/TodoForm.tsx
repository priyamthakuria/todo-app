import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (todo: { text: string, category: string, dueDate: string, priority: string }) => void;
  categories: string[];
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, categories }) => {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('P4');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo({ text, category, dueDate, priority });
    setText('');
    setCategory('');
    setDueDate('');
    setPriority('P4');
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setText('');
    setCategory('');
    setDueDate('');
    setPriority('P4');
    setIsExpanded(false);
  };

  const priorityOptions = [
    { value: 'P1', label: 'Priority 1', color: 'var(--priority-1)' },
    { value: 'P2', label: 'Priority 2', color: 'var(--priority-2)' },
    { value: 'P3', label: 'Priority 3', color: 'var(--priority-3)' },
    { value: 'P4', label: 'Priority 4', color: 'var(--priority-4)' }
  ];

  return (
    <div className="todo-form-container">
      {!isExpanded ? (
        <div className="quick-add-container">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (!isExpanded && e.target.value) setIsExpanded(true);
            }}
            placeholder="Add a new task..."
            className="quick-add-input"
            onFocus={() => setIsExpanded(true)}
          />
          <button
            type="button"
            className="add-button-simple"
            onClick={() => setIsExpanded(true)}
            aria-label="Expand form"
          >
            <span className="plus-icon">+</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-main">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
              autoFocus
            />
          </div>
          <div className="form-options">
            <div className="options-row">
              <div className="option-group">
                <label className="option-label">
                  <span className="option-icon">📅</span>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="date-input"
                  />
                </label>
              </div>
              <div className="option-group">
                <label className="option-label">
                  <span className="option-icon">🏷️</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="category-select"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="option-group">
                <label className="option-label">
                  <span className="option-icon">🚩</span>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="priority-select"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="add-button" disabled={!text.trim()}>
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TodoForm; 