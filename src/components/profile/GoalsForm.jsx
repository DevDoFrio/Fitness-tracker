'use client';

import { useState, useEffect } from 'react';

export default function GoalsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    calorieGoal: '',
    proteinGoal: '',
    carbsGoal: '',
    fatsGoal: '',
    workoutGoalWeekly: '',
    goalWeight: '',
    currentWeight: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      if (!response.ok) throw new Error(response);
      const data = await response.json();

      if (data) {
        setFormData({
          calorieGoal: data.calorieGoal?.toString() || '',
          proteinGoal: data.proteinGoal?.toString() || '',
          carbsGoal: data.carbsGoal?.toString() || '',
          fatsGoal: data.fatsGoal?.toString() || '',
          workoutGoalWeekly: data.workoutGoalWeekly?.toString() || '',
          goalWeight: data.goalWeight?.toString() || '',
          currentWeight: data.currentWeight?.toString() || '',
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update goals');
      }

      setSuccess('Goals updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Goals</h2>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Daily Goals</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="calorieGoal" className="block text-sm font-medium text-gray-700 mb-2">
          Daily Calorie Goal
        </label>
        <input
          type="number"
          id="calorieGoal"
          name="calorieGoal"
          value={formData.calorieGoal}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 2000"
        />
      </div>

      <div>
        <label htmlFor="goalWeight" className="block text-sm font-medium text-gray-700 mb-2">
          Goal Weight (lbs)
        </label>
        <input
          type="number"
          id="goalWeight"
          name="goalWeight"
          value={formData.goalWeight}
          onChange={handleChange}
          min="0"
          step="0.1"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 150"
        />
      </div>

      <div>
        <label htmlFor="currentWeight" className="block text-sm font-medium text-gray-700 mb-2">
          Current Weight (lbs)
        </label>
        <input
          type="number"
          id="currentWeight"
          name="currentWeight"
          value={formData.currentWeight}
          onChange={handleChange}
          min="0"
          step="0.1"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 160"
        />
      </div>

      <div>
        <label htmlFor="proteinGoal" className="block text-sm font-medium text-gray-700 mb-2">
          Daily Protein Goal (g)
        </label>
        <input
          type="number"
          id="proteinGoal"
          name="proteinGoal"
          value={formData.proteinGoal}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 150"
        />
      </div>

      <div>
        <label htmlFor="carbsGoal" className="block text-sm font-medium text-gray-700 mb-2">
          Daily Carbs Goal (g)
        </label>
        <input
          type="number"
          id="carbsGoal"
          name="carbsGoal"
          value={formData.carbsGoal}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 200"
        />
      </div>

      <div>
        <label htmlFor="fatsGoal" className="block text-sm font-medium text-gray-700 mb-2">
          Daily Fats Goal (g)
        </label>
        <input
          type="number"
          id="fatsGoal"
          name="fatsGoal"
          value={formData.fatsGoal}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 65"
        />
      </div>

      <div>
        <label htmlFor="workoutGoalWeekly" className="block text-sm font-medium text-gray-700 mb-2">
          Weekly Workout Goal
        </label>
        <input
          type="number"
          id="workoutGoalWeekly"
          name="workoutGoalWeekly"
          value={formData.workoutGoalWeekly}
          onChange={handleChange}
          min="0"
          max="7"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 4"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save Goals'}
      </button>
    </form>
  );
}
