/*
  Warnings:

  - You are about to drop the `Placeholder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Placeholder";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
