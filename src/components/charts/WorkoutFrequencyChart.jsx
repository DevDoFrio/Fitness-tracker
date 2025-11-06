'use client';

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function WorkoutFrequencyChart({ data, goal }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Workout Frequency & Calories</h2>
        <div className="text-gray-600 text-center py-8">No workout data available</div>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    weekLabel: new Date(item.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Workout Frequency & Calories</h2>
      {goal && (
        <p className="text-sm text-gray-600 mb-4">
          Goal: {goal} workouts per week
        </p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weekLabel" />
          <YAxis yAxisId="left" label={{ value: 'Workouts', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Workouts" />
       </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
