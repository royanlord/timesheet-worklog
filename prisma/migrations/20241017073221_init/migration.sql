-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "workHours" INTEGER NOT NULL,
    "workDays" INTEGER NOT NULL,
    "leaveDays" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
