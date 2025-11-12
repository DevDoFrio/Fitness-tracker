import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const meals = await prisma.meal.findMany({
      where: {
        userId: session.user.id,
        ...(startDate && endDate && {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      },
      include: {
        foods: true,
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(meals);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { mealType, name, calories, fats, carbs, protein, date, foods } = body;

    if (!mealType || !name || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mealData = {
      mealType,
      name,
      calories: parseInt(calories),
      fats: parseFloat(fats),
      carbs: parseFloat(carbs),
      protein: parseFloat(protein),
      date: new Date(date + 'T00:00:00'),
      userId: session.user.id,
    };

    if (foods && foods.length > 0) {
      mealData.foods = {
        create: foods.map((food) => ({
          name: food.name,
          weightGrams: parseFloat(food.weightGrams),
          calories: parseFloat(food.calories),
          protein: parseFloat(food.protein),
          carbs: parseFloat(food.carbs),
          fats: parseFloat(food.fats),
        })),
      };
    }

    const meal = await prisma.meal.create({
      data: mealData,
      include: {
        foods: true,
      },
    });

    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create meal', details: error.message },
      { status: 500 }
    );
  }
}

