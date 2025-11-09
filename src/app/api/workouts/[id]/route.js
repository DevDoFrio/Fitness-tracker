import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const workout = await prisma.workout.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
      include: {
        exercises: true,
      },
    });

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(workout);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch workout' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { type, duration, caloriesBurned, notes, date, exercises } = body;

    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingWorkout) {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      );
    }

    const workout = await prisma.workout.update({
      where: { id: id },
      data: {
        type,
        duration: parseInt(duration),
        caloriesBurned: parseInt(caloriesBurned),
        notes: notes || null,
        date: new Date(date + 'T00:00:00'),
        exercises: {
          deleteMany: {},
          create: exercises && exercises.length > 0 ? exercises.map((exercise) => ({
            name: exercise.exercise,
            muscleGroup: exercise.muscleGroup || null,
            weight: parseFloat(exercise.weight),
          })) : [],
        },
      },
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update workout' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingWorkout) {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      );
    }

    await prisma.workout.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete workout' },
      { status: 500 }
    );
  }
}
