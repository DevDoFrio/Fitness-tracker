'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MealForm({ initialData = null, mealId = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    mealType: initialData?.mealType || '',
    name: initialData?.name || '',
    calories: initialData?.calories?.toString() || '',
    fats: initialData?.fats?.toString() || '',
    carbs: initialData?.carbs?.toString() || '',
    protein: initialData?.protein?.toString() || '',
    date: initialData?.date
      ? new Date(initialData.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  });

  const mealTypes = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Snack'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = mealId ? `/api/meals/${mealId}` : '/api/meals';
      const method = mealId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details || data.error || 'Failed to save meal');
      }

      router.push('/meals');
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
          Meal Type *
        </label>
        <select
          id="mealType"
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a type</option>
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Meal Name *
        </label>
        <input
          type="string"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-2">
          Calories *
        </label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          required
          min="1"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="fats" className="block text-sm font-medium text-gray-700 mb-2">
          fats *
        </label>
        <input
          type="number"
          id="fats"
          name="fats"
          value={formData.fats}
          onChange={handleChange}
          required
          min="0"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
       <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-2">
         Protein *
       </label>
       <input
         type="number"
         id="protein"
         name="protein"
         value={formData.protein}
         onChange={handleChange}
         required
         min="0"
         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
       />
       </div> 

       <div>
        <label htmlFor="carbs" className="block text-sm font-medium text-gray-700 mb-2">
          Carbs *
        </label>
        <input
          type="number"
          id="carbs"
          name="carbs"
          value={formData.carbs}
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

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : mealId ? 'Update Meal' : 'Save Meal'}
        </button>
        <Link
          href="/meals"
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 text-center"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

