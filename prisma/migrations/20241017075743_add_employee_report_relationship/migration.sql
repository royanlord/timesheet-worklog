/*
  Warnings:

  - You are about to drop the column `name` on the `ReportTimesheet` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `ReportTimesheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportTimesheet" DROP COLUMN "name",
ADD COLUMN     "employeeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportTimesheet" ADD CONSTRAINT "ReportTimesheet_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
