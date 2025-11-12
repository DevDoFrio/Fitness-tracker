import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimiter';

export async function GET(req) {
  try {
    const rateLimitResult = await checkRateLimit('fda-api', 1000, 3600000);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter.toString(),
            'X-RateLimit-Limit': '1000',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const apiKey = process.env.USDA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'USDA API key not configured' },
        { status: 500 }
      );
    }

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`USDA API error: ${response.status}`);
    }

    const data = await response.json();

    const foods = data.foods?.map((food) => {
      const nutrients = food.foodNutrients || [];

      const getNutrient = (nutrientId) => {
        const nutrient = nutrients.find(n => n.nutrientId === nutrientId);
        return nutrient?.value || 0;
      };


      return {
        fdcId: food.fdcId,
        description: food.description,
        brandName: food.brandName || null,
        calories: getNutrient(1008),
        protein: getNutrient(1003),
        carbs: getNutrient(1005),
        fats: getNutrient(1004),
        servingSize: food.servingSize || 100,
        servingSizeUnit: food.servingSizeUnit || 'g',
      };
    }) || [];

    return NextResponse.json(
      { foods },
      {
        headers: {
          'X-RateLimit-Limit': '1000',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      }
    );
  } catch (error) {
    console.error('Food search error:', error);
    return NextResponse.json(
      { error: 'Failed to search foods', details: error.message },
      { status: 500 }
    );
  }
}
