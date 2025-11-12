'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function WeightChart({ currentWeight, goalWeight }) {
  if (!currentWeight && !goalWeight) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weight Progress</h2>
        <div className="text-gray-600 text-center py-8">No weight data available</div>
      </div>
    );
  }

  const data = [
    {
      name: 'Weight',
      'Current Weight': currentWeight || 0,
      'Goal Weight': goalWeight || 0,
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Weight Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Current Weight" fill="#3b82f6" name="Current Weight" />
          <Bar dataKey="Goal Weight" fill="#10b981" name="Goal Weight" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
