'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import WorkoutForm from '@/components/workouts/WorkoutForm';

export default function EditWorkoutPage({ params }) {
  const unwrappedParams = use(params);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    try {
      const response = await fetch(`/api/workouts/${unwrappedParams.id}`);
      if (!response.ok) throw new Error('Failed to fetch workout');
      
      const data = await response.json();
      setWorkout(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Workout</h1>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Workout</h1>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/workouts"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to Workouts
        </Link>
      </div>

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Workout</h1>
        <WorkoutForm initialData={workout} workoutId={unwrappedParams.id} />
      </div>
    </div>
  );
}
