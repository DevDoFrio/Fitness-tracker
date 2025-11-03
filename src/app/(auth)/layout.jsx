export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Fitness Tracker</h1>
          <p className="text-gray-600 mt-2">Track your fitness journey</p>
        </div>
        {children}
      </div>
    </div>
  );
}
