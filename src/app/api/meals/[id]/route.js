import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    const meal = await prisma.meal.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        foods: true,
      },
    });

    if (!meal)
      return NextResponse.json({ error: 'Meal not found' }, { status: 404 });

    return NextResponse.json(meal);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meal' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { mealType, name, calories, protein, carbs, fats, date, foods } = await req.json();

    const existingMeal = await prisma.meal.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingMeal)
      return NextResponse.json({ error: 'Meal not found' }, { status: 404 });

    const meal = await prisma.meal.update({
      where: { id },
      data: {
        mealType,
        name,
        calories: parseInt(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fats: parseFloat(fats),
        date: new Date(date + 'T00:00:00'),
        foods: {
          deleteMany: {},
          create: foods && foods.length > 0 ? foods.map((food) => ({
            name: food.name,
            weightGrams: parseFloat(food.weightGrams),
            calories: parseFloat(food.calories),
            protein: parseFloat(food.protein),
            carbs: parseFloat(food.carbs),
            fats: parseFloat(food.fats),
          })) : [],
        },
      },
      include: {
        foods: true,
      },
    });

    return NextResponse.json(meal);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update meal', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    const existingMeal = await prisma.meal.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingMeal)
      return NextResponse.json({ error: 'Meal not found' }, { status: 404 });

    await prisma.meal.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

