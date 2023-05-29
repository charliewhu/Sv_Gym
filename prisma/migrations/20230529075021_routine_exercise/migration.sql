-- CreateTable
CREATE TABLE "RoutineExercise" (
    "id" SERIAL NOT NULL,
    "routine" INTEGER NOT NULL,
    "exercise" INTEGER NOT NULL,

    CONSTRAINT "RoutineExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routine_fkey" FOREIGN KEY ("routine") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exercise_fkey" FOREIGN KEY ("exercise") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
