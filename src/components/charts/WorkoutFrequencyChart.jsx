'use client';

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function WorkoutFrequencyChart({ data, goal }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Workout Frequency</h2>
        <div className="text-gray-600 text-center py-8">No workout data available</div>
      </div>
    );
  }

  const formattedData = data.map((item) => {
    const [year, month, day] = item.week.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const startLabel = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endLabel = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return {
      ...item,
      dateLabel: `${startLabel} - ${endLabel}`,
    };
  });

  // Calculate the max value from the data
  const maxCount = Math.max(...formattedData.map(item => item.count));

  // Set domain: use goal as max, but increase if user exceeded it
  const yAxisMax = goal ? Math.max(goal, maxCount) : maxCount;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Workout Frequency</h2>
      {goal && (
        <p className="text-sm text-gray-600 mb-4">
          Goal: {goal} workouts per week
        </p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateLabel" />
          <YAxis
            yAxisId="left"
            label={{ value: 'Workouts', angle: -90, position: 'insideLeft' }}
            domain={[0, yAxisMax]}
          />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Workouts" />
       </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
