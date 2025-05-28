// App.jsx
import React, { useState } from 'react';
import DSASection from './components/DSASection';
import MongoDBSection from './components/MongoDBSection';
import TodoSection from './components/TodoSection';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dsa');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold">Gravity Assessment Portal</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('dsa')}
            className={`px-6 py-2 rounded ${
              activeTab === 'dsa' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            DSA Problems
          </button>
          <button
            onClick={() => setActiveTab('mongodb')}
            className={`px-6 py-2 rounded ${
              activeTab === 'mongodb' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            MongoDB Query
          </button>
          <button
            onClick={() => setActiveTab('todo')}
            className={`px-6 py-2 rounded ${
              activeTab === 'todo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            React Todo App
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 pb-20">
        {activeTab === 'dsa' && <DSASection />}
        {activeTab === 'mongodb' && <MongoDBSection />}
        {activeTab === 'todo' && <TodoSection />}
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {activeTab === 'dsa' && 'DSA Problems'}
            {activeTab === 'mongodb' && 'MongoDB Query'}
            {activeTab === 'todo' && 'Todo App'}
          </div>
          <div className="w-full mx-4 bg-gray-200 rounded-full h-2">
            <div className={`bg-blue-500 h-2 rounded-full ${
              activeTab === 'dsa' ? 'w-1/3' : 
              activeTab === 'mongodb' ? 'w-2/3' : 'w-full'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;