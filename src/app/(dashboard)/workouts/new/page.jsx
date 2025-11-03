import Link from 'next/link';
import WorkoutForm from '@/components/workouts/WorkoutForm';

export default function NewWorkoutPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Workout</h1>
        <WorkoutForm />
      </div>
    </div>
  );
}
