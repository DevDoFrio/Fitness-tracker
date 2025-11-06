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

    const preferences = await prisma.userPreferences.findUnique({
      where: {
        userId: session.user.id,
      },
    });
    
    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { calorieGoal, proteinGoal, carbsGoal, fatsGoal, workoutGoalWeekly } = body;

    const preferences = await prisma.userPreferences.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        calorieGoal: calorieGoal ? parseInt(calorieGoal) : null,
        proteinGoal: proteinGoal ? parseInt(proteinGoal) : null,
        carbsGoal: carbsGoal ? parseInt(carbsGoal) : null,
        fatsGoal: fatsGoal ? parseInt(fatsGoal) : null,
        workoutGoalWeekly: workoutGoalWeekly ? parseInt(workoutGoalWeekly) : null,
      },
      create: {
        userId: session.user.id,
        calorieGoal: calorieGoal ? parseInt(calorieGoal) : null,
        proteinGoal: proteinGoal ? parseInt(proteinGoal) : null,
        carbsGoal: carbsGoal ? parseInt(carbsGoal) : null,
        fatsGoal: fatsGoal ? parseInt(fatsGoal) : null,
        workoutGoalWeekly: workoutGoalWeekly ? parseInt(workoutGoalWeekly) : null,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error updating goals:', error);
    return NextResponse.json(
      { error: 'Failed to update goals' },
      { status: 500 }
    );
  }
}
