/*
  Warnings:

  - Added the required column `reps` to the `WorkoutExerciseSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rir` to the `WorkoutExerciseSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `WorkoutExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutExerciseSet" ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "rir" INTEGER NOT NULL,
ADD COLUMN     "weight" DECIMAL(65,30) NOT NULL;
