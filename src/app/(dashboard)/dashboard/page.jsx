export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
        <p className="text-gray-600">
          Ready to track your fitness journey? Get started by logging a workout or meal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
          <a href="/workouts/new"
          className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          <div className="text-4xl mb-2">💪</div>
          <h3 className="text-lg font-semibold">Log Workout</h3>
        </a>
        
        
          <a href="/meals/new"
          className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center"
        >
          <div className="text-4xl mb-2">🍽️</div>
          <h3 className="text-lg font-semibold">Log Meal</h3>
        </a>
      </div>

           
    </div>
  );
}
