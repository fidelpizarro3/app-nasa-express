-- CreateTable
CREATE TABLE "Apod" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "hdurl" TEXT,
    "url" TEXT NOT NULL,
    "copyright" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apod_pkey" PRIMARY KEY ("id")
);
