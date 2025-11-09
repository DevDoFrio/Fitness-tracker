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
    const days = parseInt(searchParams.get('days') || '30');

    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days, 0, 0, 0, 0); 

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    const workouts = await prisma.workout.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });

    const meals = await prisma.meal.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });


    const mealsByDate = meals.reduce((acc, meal) => {
      const date = new Date(meal.date);
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        };
      }
      acc[dateKey].calories += meal.calories;
      acc[dateKey].protein += meal.protein;
      acc[dateKey].carbs += meal.carbs;
      acc[dateKey].fats += meal.fats;
      return acc;
    }, {});

    const dailyNutrition = Object.values(mealsByDate).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    const workoutsByWeek = {};
    workouts.forEach((workout) => {
      const date = new Date(workout.date);
      const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const dayOfWeek = localDate.getDay();
      const monday = new Date(localDate);
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      monday.setDate(localDate.getDate() - daysToSubtract);

      const weekKey = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;

      if (!workoutsByWeek[weekKey]) {
        workoutsByWeek[weekKey] = {
          week: weekKey,
          count: 0,
          totalCaloriesBurned: 0,
        };
      }
      workoutsByWeek[weekKey].count++;
      workoutsByWeek[weekKey].totalCaloriesBurned += workout.caloriesBurned;
    });

    const weeklyWorkouts = Object.values(workoutsByWeek).sort((a, b) =>
      a.week.localeCompare(b.week)
    );

    const workoutsByDate = {};
    workouts.forEach((workout) => {
      const date = new Date(workout.date);
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (!workoutsByDate[dateKey]) {
        workoutsByDate[dateKey] = {
          date: dateKey,
          count: 0,
          totalCaloriesBurned: 0,
        };
      }
      workoutsByDate[dateKey].count++;
      workoutsByDate[dateKey].totalCaloriesBurned += workout.caloriesBurned;
    });

    const dailyWorkouts = Object.values(workoutsByDate).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    return NextResponse.json({
      goals: preferences || {},
      dailyNutrition,
      weeklyWorkouts,
      dailyWorkouts,
      totalWorkouts: workouts.length,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        days,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
