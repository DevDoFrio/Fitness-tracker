'use client';

import { useEffect, useState } from 'react';
import WorkoutFrequencyChart from '@/components/charts/WorkoutFrequencyChart';
import NutritionChart from '@/components/charts/NutritionChart';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?days=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics</h1>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7">Last 7 days</option>
          <option value="14">Last 14 days</option>
          <option value="30">Last 30 days</option>
          <option value="60">Last 60 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {analytics && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Workouts</h3>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalWorkouts}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Average Weekly</h3>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.weeklyWorkouts.length > 0
                  ? (
                      analytics.totalWorkouts / analytics.weeklyWorkouts.length
                    ).toFixed(1)
                  : '0'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Weekly Goal</h3>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.goals?.workoutGoalWeekly || 'Not set'}
              </p>
            </div>
          </div>

          <WorkoutFrequencyChart
            data={analytics.weeklyWorkouts}
            goal={analytics.goals?.workoutGoalWeekly}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NutritionChart
              data={analytics.dailyNutrition}
              goals={analytics.goals}
              metric="calories"
            />
            <NutritionChart
              data={analytics.dailyNutrition}
              goals={analytics.goals}
              metric="protein"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NutritionChart
              data={analytics.dailyNutrition}
              goals={analytics.goals}
              metric="carbs"
            />
            <NutritionChart
              data={analytics.dailyNutrition}
              goals={analytics.goals}
              metric="fats"
            />
          </div>
        </div>
      )}
    </div>
  );
}
