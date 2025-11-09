'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ExerciseSelector from './ExerciseSelector';

export default function WorkoutForm({ initialData = null, workoutId = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    type: initialData?.type || '',
    duration: initialData?.duration?.toString() || '',
    caloriesBurned: initialData?.caloriesBurned?.toString() || '',
    notes: initialData?.notes || '',
    date: initialData?.date
      ? new Date(initialData.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    exercises: initialData?.exercises || [],
  });

  const workoutTypes = [
    'Cardio',
    'Strength',
    'Sports',
    'Flexibility',
    'HIIT',
    'Yoga',
    'Swimming',
    'Cycling',
    'Running',
    'Walking',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExercisesChange = (exercises) => {
    setFormData({
      ...formData,
      exercises,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = workoutId ? `/api/workouts/${workoutId}` : '/api/workouts';
      const method = workoutId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details || data.error || 'Failed to save workout');
      }

      router.push('/workouts');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
          Workout Type *
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a type</option>
          {workoutTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {formData.type === 'Strength' && (
        <ExerciseSelector
          exercises={formData.exercises}
          onExercisesChange={handleExercisesChange}
        />
      )}

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
          Duration (minutes) *
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          min="1"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="caloriesBurned" className="block text-sm font-medium text-gray-700 mb-2">
          Calories Burned *
        </label>
        <input
          type="number"
          id="caloriesBurned"
          name="caloriesBurned"
          value={formData.caloriesBurned}
          onChange={handleChange}
          required
          min="0"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Date *
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="How did you feel? Any achievements?"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : workoutId ? 'Update Workout' : 'Save Workout'}
        </button>
        <Link
          href="/workouts"
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 text-center"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
