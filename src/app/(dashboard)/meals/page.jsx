'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MealsTable from '@/components/meals/MealsTable';

export default function MealPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/meals');
      if (!response.ok) throw new Error('Failed to fetch meals');
      const data = await response.json();
      setMeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete meal');

      setMeals(meals.filter((m) => m.id !== id));
    } catch (err) {
      alert('Error deleting meal: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Meals</h1>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Meals</h1>
        <Link
          href="/meals/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Meal
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <MealsTable meals={meals} onDelete={handleDelete} />
    </div>
  );
}
