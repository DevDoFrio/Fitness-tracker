'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function NutritionChart({ data, goals, metric = 'calories' }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Daily {metric.charAt(0).toUpperCase() + metric.slice(1)}
        </h2>
        <div className="text-gray-600 text-center py-8">No nutrition data available</div>
      </div>
    );
  }
  
  const formattedData = data.map((item) => {
    const [year, month, day] = item.date.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return {
      ...item,
      dateLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(item[metric]),
    };
  });

  const goalFieldName = metric === 'calories' ? 'calorieGoal' : `${metric}Goal`;
  const goalValueRaw = goals?.[goalFieldName];
  const goalValue = goalValueRaw ? Number(goalValueRaw) : null;

  const metricLabel = metric === 'calories' ? 'Calories' :
                      metric === 'protein' ? 'Protein (g)' :
                      metric === 'carbs' ? 'Carbs (g)' :
                      metric === 'fats' ? 'Fats (g)' : metric;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily {metricLabel}</h2>
      {goalValue && (
        <p className="text-sm text-gray-600 mb-4">
          Goal: {goalValue} {metric !== 'calories' ? 'g' : ''} per day
        </p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateLabel" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            name={metricLabel}
            dot={{ fill: '#3b82f6' }}
          />
          {goalValue !== null && !isNaN(goalValue) && (
            <ReferenceLine
              y={goalValue}
              stroke="#ef4444"
              strokeDasharray="3 3"
              label="Goal"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
