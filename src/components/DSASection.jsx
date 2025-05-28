import React, { useState } from 'react';

const DSASection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      title: "Question 1: Longest Increasing Subsequence",
      description: "Given an array of integers, return the length of the longest increasing subsequence. A subsequence is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.",
      example: "Example: [10, 9, 2, 5, 3, 7, 101, 18] → [2, 3, 7, 101] (length: 4)",
      defaultInput: "[10, 9, 2, 5, 3, 7, 101, 18]",
      answer: `function lengthOfLIS(nums) {
  if (!nums || nums.length === 0) return 0;
  
  const dp = new Array(nums.length).fill(1);
  let maxLen = 1;
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  
  return maxLen;
}`
    },
    {
      title: "Question 2: Two Sum",
      description: "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      example: "Example: nums = [2, 7, 11, 15], target = 9 → [0, 1] because nums[0] + nums[1] = 2 + 7 = 9",
      defaultInput: "nums: [2, 7, 11, 15], target: 9",
      answer: `function twoSum(nums, target) {
  if (!nums || nums.length < 2) return [];
  
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`
    }
  ];

  const executeCode = () => {
    const question = questions[currentQuestion];
    const input = customInput || question.defaultInput;

    try {
      if (currentQuestion === 0) {
        const nums = JSON.parse(input);
        const result = lengthOfLIS(nums);
        setOutput(`Result: ${result}\nInput: ${JSON.stringify(nums)}`);
      } else {
        const match = input.match(/nums:\s*(\[.*?\]).*target:\s*(\d+)/);
        if (match) {
          const nums = JSON.parse(match[1]);
          const target = parseInt(match[2]);
          const result = twoSum(nums, target);
          setOutput(`Result: [${result}]\nInput: nums=${JSON.stringify(nums)}`);
        }
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const lengthOfLIS = (nums) => {
    if (!nums || nums.length === 0) return 0;
    const dp = new Array(nums.length).fill(1);
    let maxLen = 1;

    for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
      maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
  };

  const twoSum = (nums, target) => {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement)) {
        return [map.get(complement), i];
      }
      map.set(nums[i], i);
    }
    return [];
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCustomInput('');
      setOutput('');
      setShowAnswer(false);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg border p-6">
        {/* Question Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentQ.title}</h2>

        {/* Problem Description */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-3">{currentQ.description}</p>
          <p className="text-gray-600 mb-3">{currentQ.example}</p>
          <p className="text-sm text-gray-500">{currentQ.requirements}</p>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Test Input:</h3>

          {/* Default Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Default Input:</label>
            <div className="bg-white border rounded-lg p-3 text-gray-700">
              {currentQ.defaultInput}
            </div>
          </div>

          {/* Custom Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Custom Input:</label>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter your test case..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={executeCode}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Execute Code
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Get Answer
            </button>
            {currentQuestion < questions.length - 1 && (
              <button
                onClick={nextQuestion}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Output Section */}
        {output && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Output:</h3>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm whitespace-pre-line">
              {output}
            </div>
          </div>
        )}

        {/* Answer Section */}
        {showAnswer && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Solution:</h3>
            <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-sm whitespace-pre-line overflow-x-auto">
              {currentQ.answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSASection;