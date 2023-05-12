/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `workoutExerciseId` on the `WorkoutExerciseSet` table. All the data in the column will be lost.
  - Added the required column `exercise` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workout` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutExercise` to the `WorkoutExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseSet" DROP CONSTRAINT "WorkoutExerciseSet_workoutExerciseId_fkey";

-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "exerciseId",
DROP COLUMN "workoutId",
ADD COLUMN     "exercise" INTEGER NOT NULL,
ADD COLUMN     "workout" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExerciseSet" DROP COLUMN "workoutExerciseId",
ADD COLUMN     "workoutExercise" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workout_fkey" FOREIGN KEY ("workout") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exercise_fkey" FOREIGN KEY ("exercise") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSet" ADD CONSTRAINT "WorkoutExerciseSet_workoutExercise_fkey" FOREIGN KEY ("workoutExercise") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
