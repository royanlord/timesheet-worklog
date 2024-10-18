/*
  Warnings:

  - You are about to drop the `ReportTimesheet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReportTimesheet" DROP CONSTRAINT "ReportTimesheet_employeeId_fkey";

-- DropTable
DROP TABLE "ReportTimesheet";

-- CreateTable
CREATE TABLE "Worklog" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isAbsence" BOOLEAN NOT NULL,
    "absenceType" TEXT,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Worklog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorklogProject" (
    "id" SERIAL NOT NULL,
    "worklogId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WorklogProject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Worklog" ADD CONSTRAINT "Worklog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorklogProject" ADD CONSTRAINT "WorklogProject_worklogId_fkey" FOREIGN KEY ("worklogId") REFERENCES "Worklog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorklogProject" ADD CONSTRAINT "WorklogProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
