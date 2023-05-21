-- CreateTable
CREATE TABLE "WorkoutExerciseSet" (
    "id" SERIAL NOT NULL,
    "workoutExerciseId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExerciseSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSet" ADD CONSTRAINT "WorkoutExerciseSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
