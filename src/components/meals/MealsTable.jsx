'use client';

import Link from 'next/link';

export default function MealsTable({ meals, onDelete }) {
  if (meals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-6xl mb-4">🍕</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No meals yet
        </h2>
        <p className="text-gray-600 mb-4">
          Start tracking your fitness journey by logging your first meal!
        </p>
        <Link
          href="/meals/new"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Log Your First Meal
        </Link>
      </div>
    );
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this meal?')) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Calories
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Protein
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Carbs
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fats
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {meals.map((meal) => (
            <tr key={meal.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(meal.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {meal.mealType}
              </td>
 
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {meal.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {meal.calories} cal
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {meal.protein}g protein
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {meal.carbs}g carbs
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {meal.fats}g fat
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <Link
                  href={`/meals/${meal.id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(meal.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
