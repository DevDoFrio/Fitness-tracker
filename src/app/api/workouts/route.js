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

    const workouts = await prisma.workout.findMany({
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
        exercises: true,
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch workouts' },
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
    const { type, duration, caloriesBurned, notes, date, exercises } = body;

    if (!type || !duration || !caloriesBurned || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const workoutData = {
      type,
      duration: parseInt(duration),
      caloriesBurned: parseInt(caloriesBurned),
      notes: notes || null,
      date: new Date(date + 'T00:00:00'),
      userId: session.user.id,
    };

    if (exercises && exercises.length > 0) {
      workoutData.exercises = {
        create: exercises.map((exercise) => ({
          name: exercise.exercise,
          muscleGroup: exercise.muscleGroup || null,
          weight: parseFloat(exercise.weight),
        })),
      };
    }

    const workout = await prisma.workout.create({
      data: workoutData,
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create workout', details: error.message },
      { status: 500 }
    );
  }
}
