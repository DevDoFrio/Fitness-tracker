'use client';

import { useState } from 'react';
import exercisesData from '@/data/exercises.json';

export default function ExerciseSelector({ exercises, onExercisesChange }) {
  const normalizedExercises = exercises.map((ex) => ({
    muscleGroup: ex.muscleGroup || '',
    exercise: ex.exercise || ex.name || '',
    weight: ex.weight || '',
  }));

  const [currentExercise, setCurrentExercise] = useState({
    muscleGroup: '',
    exercise: '',
    weight: '',
  });

  const handleExerciseChange = (e) => {
    setCurrentExercise({
      ...currentExercise,
      [e.target.name]: e.target.value,
    });
  };

  const addExercise = () => {
    if (currentExercise.exercise && currentExercise.weight) {
      onExercisesChange([...normalizedExercises, { ...currentExercise }]);
      setCurrentExercise({
        muscleGroup: '',
        exercise: '',
        weight: '',
      });
    }
  };

  const removeExercise = (index) => {
    onExercisesChange(normalizedExercises.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Exercises</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="muscleGroup" className="block text-sm font-medium text-gray-700 mb-2">
            Muscle Group
          </label>
          <select
            id="muscleGroup"
            name="muscleGroup"
            value={currentExercise.muscleGroup}
            onChange={handleExerciseChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select muscle group</option>
            {Object.keys(exercisesData).map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="exercise" className="block text-sm font-medium text-gray-700 mb-2">
            Exercise
          </label>
          <select
            id="exercise"
            name="exercise"
            value={currentExercise.exercise}
            onChange={handleExerciseChange}
            disabled={!currentExercise.muscleGroup}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select exercise</option>
            {currentExercise.muscleGroup &&
              exercisesData[currentExercise.muscleGroup].map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={currentExercise.weight}
            onChange={handleExerciseChange}
            min="0"
            step="0.5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 100"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={addExercise}
        disabled={!currentExercise.exercise || !currentExercise.weight}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Exercise
      </button>

      {normalizedExercises.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Added Exercises:</h4>
          {normalizedExercises.map((exercise, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div>
                <span className="font-medium">{exercise.exercise}</span>
                <span className="text-gray-600"> - {exercise.weight} lbs</span>
                {exercise.muscleGroup && (
                  <span className="text-sm text-gray-500"> ({exercise.muscleGroup})</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeExercise(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
