-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "calorieGoal" INTEGER,
    "proteinGoal" INTEGER,
    "carbsGoal" INTEGER,
    "fatsGoal" INTEGER,
    "workoutGoalWeekly" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "caloriesBurned" INTEGER NOT NULL,
    "notes" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "mealType" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE INDEX "Workout_userId_idx" ON "Workout"("userId");

-- CreateIndex
CREATE INDEX "Workout_userId_date_idx" ON "Workout"("userId", "date");

-- CreateIndex
CREATE INDEX "Meal_userId_idx" ON "Meal"("userId");

-- CreateIndex
CREATE INDEX "Meal_userId_date_idx" ON "Meal"("userId", "date");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
