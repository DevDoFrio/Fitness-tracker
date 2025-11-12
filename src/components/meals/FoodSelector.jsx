'use client';

import { useState, useEffect, useRef } from 'react';

export default function FoodSelector({ foods, onFoodsChange }) {
  const normalizedFoods = foods.map((food) => ({
    name: food.name || '',
    weightGrams: food.weightGrams ?? '',
    calories: food.calories ?? '',
    protein: food.protein ?? '',
    carbs: food.carbs ?? '',
    fats: food.fats ?? '',
  }));

  const [currentFood, setCurrentFood] = useState({
    name: '',
    weightGrams: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedFoodData, setSelectedFoodData] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        searchFoods(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedFoodData && currentFood.weightGrams) {
      const weight = parseFloat(currentFood.weightGrams);
      if (weight > 0) {
        const multiplier = weight / 100;
        setCurrentFood((prev) => ({
          ...prev,
          calories: ((selectedFoodData.calories || 0) * multiplier).toFixed(1),
          protein: ((selectedFoodData.protein || 0) * multiplier).toFixed(1),
          carbs: ((selectedFoodData.carbs || 0) * multiplier).toFixed(1),
          fats: ((selectedFoodData.fats || 0) * multiplier).toFixed(1),
        }));
      }
    }
  }, [currentFood.weightGrams, selectedFoodData]);

  const searchFoods = async (query) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/foods/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setSearchResults(data.foods || []);
      setShowResults(true);
    } catch (error) {
      console.error('Food search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const selectFood = (food) => {
    setCurrentFood({
      name: food.brandName ? `${food.description} (${food.brandName})` : food.description,
      weightGrams: '100',
      calories: food.calories.toFixed(1),
      protein: food.protein.toFixed(1),
      carbs: food.carbs.toFixed(1),
      fats: food.fats.toFixed(1),
    });
    setSelectedFoodData({
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fats: food.fats,
    });
    setSearchQuery('');
    setShowResults(false);
  };

  const handleFoodChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setSearchQuery(value);
      setSelectedFoodData(null);
    }

    setCurrentFood({
      ...currentFood,
      [name]: value,
    });
  };

  const addFood = () => {
    if (currentFood.name && currentFood.weightGrams && currentFood.calories) {
      // Ensure all numeric fields have valid values (default to 0 if empty)
      const foodToAdd = {
        name: currentFood.name,
        weightGrams: parseFloat(currentFood.weightGrams) || 0,
        calories: parseFloat(currentFood.calories) || 0,
        protein: parseFloat(currentFood.protein) || 0,
        carbs: parseFloat(currentFood.carbs) || 0,
        fats: parseFloat(currentFood.fats) || 0,
      };

      onFoodsChange([...normalizedFoods, foodToAdd]);
      setCurrentFood({
        name: '',
        weightGrams: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
      });
      setSelectedFoodData(null);
      setSearchQuery('');
    }
  };

  const removeFood = (index) => {
    onFoodsChange(normalizedFoods.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Foods</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative" ref={searchRef}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Food Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={searchQuery || currentFood.name}
            onChange={handleFoodChange}
            onFocus={() => searchQuery && searchResults.length > 0 && setShowResults(true)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a food..."
          />
          {isSearching && (
            <div className="absolute right-3 top-11 text-gray-400">
              Searching...
            </div>
          )}
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((food) => (
                <button
                  key={food.fdcId}
                  type="button"
                  onClick={() => selectFood(food)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                >
                  <div className="font-medium">{food.description}</div>
                  {food.brandName && (
                    <div className="text-sm text-gray-600">{food.brandName}</div>
                  )}
                  <div className="text-xs text-gray-500">
                    {food.calories.toFixed(0)} cal | P: {food.protein.toFixed(1)}g | C: {food.carbs.toFixed(1)}g | F: {food.fats.toFixed(1)}g (per 100g)
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="weightGrams" className="block text-sm font-medium text-gray-700 mb-2">
            Weight (grams) *
          </label>
          <input
            type="number"
            id="weightGrams"
            name="weightGrams"
            value={currentFood.weightGrams}
            onChange={handleFoodChange}
            min="0"
            step="0.1"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 200"
          />
        </div>

        <div>
          <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-2">
            Calories *
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={currentFood.calories}
            onChange={handleFoodChange}
            min="0"
            step="0.1"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 165"
          />
        </div>

        <div>
          <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-2">
            Protein (g)
          </label>
          <input
            type="number"
            id="protein"
            name="protein"
            value={currentFood.protein ?? ''}
            onChange={handleFoodChange}
            min="0"
            step="0.1"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 31"
          />
        </div>

        <div>
          <label htmlFor="carbs" className="block text-sm font-medium text-gray-700 mb-2">
            Carbs (g)
          </label>
          <input
            type="number"
            id="carbs"
            name="carbs"
            value={currentFood.carbs ?? ''}
            onChange={handleFoodChange}
            min="0"
            step="0.1"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 0"
          />
        </div>

        <div>
          <label htmlFor="fats" className="block text-sm font-medium text-gray-700 mb-2">
            Fats (g)
          </label>
          <input
            type="number"
            id="fats"
            name="fats"
            value={currentFood.fats ?? ''}
            onChange={handleFoodChange}
            min="0"
            step="0.1"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 3.6"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={addFood}
        disabled={!currentFood.name || !currentFood.weightGrams || !currentFood.calories}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Food
      </button>

      {normalizedFoods.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Added Foods:</h4>
          {normalizedFoods.map((food, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div>
                <span className="font-medium">{food.name}</span>
                <span className="text-gray-600"> - {food.weightGrams}g</span>
                <div className="text-sm text-gray-500">
                  {food.calories} cal
                  {food.protein && ` | P: ${food.protein}g`}
                  {food.carbs && ` | C: ${food.carbs}g`}
                  {food.fats && ` | F: ${food.fats}g`}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFood(index)}
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
