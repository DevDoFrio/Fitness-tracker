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
    const { mealType, name, calories, fats, carbs, protein, date } = body;

    if (!mealType || !name || !fats || !calories || !carbs || !protein || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const meal = await prisma.meal.create({
      data: {
        mealType: mealType,
        name: name,
        calories: parseInt(calories),
        fats: parseInt(fats),
        carbs: parseInt(carbs),
        protein: parseInt(protein),
        date: new Date(date + 'T00:00:00'),
        userId: session.user.id,
      },
    });

    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

