-- CreateTable
CREATE TABLE "Absence" (
    "id" SERIAL NOT NULL,
    "absenceType" TEXT NOT NULL,
    "absenceValue" TEXT NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);
