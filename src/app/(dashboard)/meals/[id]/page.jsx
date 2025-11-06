'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import MealsForm from '@/components/meals/MealsForm';
import Link from 'next/link';

export default function EditMealPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(null);
 
  const unwrappedParams = use(params);

  useEffect(() => {
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    try {
      const response = await fetch(`/api/meals/${unwrappedParams.id}`);
      if (!response.ok) throw new Error('Failed to fetch meal');

      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Meal</h1>
        <div className="text-gray-600">Loading...</div>
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
          ← Back to Meals
        </Link>
      </div>

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Workout</h1>
        <MealsForm initialData={formData} mealId={unwrappedParams.id} />
      </div>
    </div>
  );
}

