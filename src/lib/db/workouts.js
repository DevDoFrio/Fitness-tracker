export async function getWorkoutsByDateRange(userId, startDate, endDate) {
  return await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { date: 'desc' },
  });
}
