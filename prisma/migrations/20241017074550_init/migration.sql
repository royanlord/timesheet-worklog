/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Employee";

-- CreateTable
CREATE TABLE "ReportTimesheet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "workHours" INTEGER NOT NULL,
    "workDays" INTEGER NOT NULL,
    "leaveDays" INTEGER NOT NULL,

    CONSTRAINT "ReportTimesheet_pkey" PRIMARY KEY ("id")
);
