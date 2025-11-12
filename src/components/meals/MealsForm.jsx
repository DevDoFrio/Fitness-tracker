'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FoodSelector from './FoodSelector';

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
    foods: initialData?.foods || [],
  });

  useEffect(() => {
    if (formData.foods) {
      const totals = formData.foods.reduce(
        (acc, food) => ({
          calories: acc.calories + (parseFloat(food.calories) || 0),
          protein: acc.protein + (parseFloat(food.protein) || 0),
          carbs: acc.carbs + (parseFloat(food.carbs) || 0),
          fats: acc.fats + (parseFloat(food.fats) || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
      );

      setFormData((prev) => ({
        ...prev,
        calories: totals.calories.toFixed(1),
        protein: totals.protein.toFixed(1),
        carbs: totals.carbs.toFixed(1),
        fats: totals.fats.toFixed(1),
      }));
    }
  }, [formData.foods]);

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

  const handleFoodsChange = (foods) => {
    setFormData({
      ...formData,
      foods,
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
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <FoodSelector
        foods={formData.foods}
        onFoodsChange={handleFoodsChange}
      />

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Total Nutrition</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calories
            </label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Auto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Protein (g)
            </label>
            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Auto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carbs (g)
            </label>
            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Auto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fats (g)
            </label>
            <input
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Auto"
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Values are auto-calculated from foods. You can manually override them if needed.
        </p>
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

