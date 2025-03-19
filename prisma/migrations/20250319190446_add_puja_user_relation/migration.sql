/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Puja" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "initialPrice" DOUBLE PRECISION NOT NULL,
    "lastPayer" TEXT,
    "createdById" TEXT NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Puja_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Puja" ADD CONSTRAINT "Puja_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
