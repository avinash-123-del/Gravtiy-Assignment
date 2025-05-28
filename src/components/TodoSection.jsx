import React, { useState, useEffect } from 'react';

const TodoSection = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodosFromAPI();
  }, []);

  const loadTodosFromAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/todos?limit=5');
      const data = await response.json();
      const apiTodos = data.todos.map(todo => ({
        id: todo.id,
        text: todo.todo,
        completed: todo.completed,
        userId: todo.userId
      }));
      setTodos(apiTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
      setTodos([
        { id: 1, text: 'Complete React Todo App', completed: false },
        { id: 2, text: 'Write MongoDB aggregation', completed: true },
        { id: 3, text: 'Solve DSA problems', completed: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Question 4: Dynamic To-Do List Application
        </h2>
        
        {/* Requirements */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Requirements:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Add new tasks</li>
            <li>✅ Mark tasks as complete/incomplete</li>
            <li>✅ Delete tasks</li>
            <li>✅ Filter tasks by all, completed, and pending</li>
            <li>✅ Load initial data from API (https://dummyjson.com/todos)</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
            <div className="text-sm text-blue-600">Total Tasks</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <div className="text-sm text-orange-600">Pending</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'pending' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading todos...</div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.length === 0 && !loading ? (
            <div className="text-center py-8 text-gray-500">
              {filter === 'all' && 'No tasks yet. Add one above!'}
              {filter === 'pending' && 'No pending tasks!'}
              {filter === 'completed' && 'No completed tasks yet!'}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Reload Button */}
        <div className="mt-6 text-center">
          <button
            onClick={loadTodosFromAPI}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Reload from API
          </button>
        </div>
      </div>
    </div>
  );
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center space-x-3 p-3 border rounded-lg ${
      todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
    }`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          todo.completed 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {todo.completed && '✓'}
      </button>

      {/* Todo Text */}
      <span className={`flex-1 ${
        todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
      }`}>
        {todo.text}
      </span>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoSection;