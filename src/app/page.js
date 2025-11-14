export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
              <span className="block">Transform Your</span>
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600">
              Track workouts, monitor nutrition, and achieve your fitness goals with data-driven insights.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Everything You Need to Succeed</h2>
            <p className="mt-4 text-xl text-gray-600">Powerful features to help you reach your fitness goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Workout Tracking */}
            <div className="relative p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Workout Tracking</h3>
              <p className="text-gray-700 leading-relaxed">
                Log cardio, strength training, HIIT, yoga, and more. Track specific exercises, sets, reps, and calories burned.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Multiple workout types
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Exercise library with muscle groups
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Track duration & calories
                </li>
              </ul>
            </div>

            <div className="relative p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Nutrition Tracking</h3>
              <p className="text-gray-700 leading-relaxed">
                Log meals and monitor macros with our FDA food database integration. Hit your calorie and nutrition goals.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  FDA food database search
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Macro tracking (protein, carbs, fats)
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Meal history & analysis
                </li>
              </ul>
            </div>

            <div className="relative p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Analytics & Insights</h3>
              <p className="text-gray-700 leading-relaxed">
                Visualize your progress with interactive charts. Track weight, workout frequency, and nutrition trends.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Weight progress tracking
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Workout frequency analytics
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Nutrition breakdown charts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Personal Fitness Dashboard
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Stay motivated and accountable with comprehensive tracking tools that give you complete visibility into your fitness journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Set Your Goals</h3>
                    <p className="text-gray-600">Define your calorie targets, macro goals, and workout frequency</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Track Your Progress</h3>
                    <p className="text-gray-600">Log workouts and meals with our easy-to-use interface</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Achieve Your Results</h3>
                    <p className="text-gray-600">Monitor trends and make data-driven decisions to reach your goals</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Key Features</div>
                  <ul className="mt-3 space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-2xl mr-3">🎯</span>
                      <span>Customizable fitness goals</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-2xl mr-3">📊</span>
                      <span>Interactive data visualizations</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-2xl mr-3">🔍</span>
                      <span>Comprehensive food database</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-2xl mr-3">📅</span>
                      <span>Calendar-based tracking</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-2xl mr-3">🏋️</span>
                      <span>Extensive exercise library</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-2xl mr-3">💯</span>
                      <span>Progress monitoring & analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join today and take control of your fitness journey with powerful tracking and analytics.
          </p>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-xl text-blue-600 bg-white hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Create Free Account
          </a>
          <p className="mt-4 text-blue-100 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-white font-semibold underline hover:text-gray-100">
              Sign in here
            </a>
          </p>
        </div>
      </div>

      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2025 Fitness Tracker. Track your workouts, nutrition, and progress.</p>
        </div>
      </div>
    </div>
  );
}

