import Link from 'next/link';
import MealsForm from '@/components/meals/MealsForm';

export default function NewMealPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/meals"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to Meals
        </Link>
      </div>

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Meals</h1>
        <MealsForm />
      </div>
    </div>
  );
}
