export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Fitness Tracker</h1>
        <p className="text-gray-600 mb-8">Track your workouts and nutrition</p>
        <div className="space-x-4">
          <a 
            href="/login" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </a>
          <a 
            href="/register" 
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
