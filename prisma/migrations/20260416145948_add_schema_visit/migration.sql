-- CreateEnum
CREATE TYPE "VisitSchedule" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT');

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "schedule" "VisitSchedule" NOT NULL,
    "type" TEXT NOT NULL,
    "comments" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToVisit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToVisit_AB_unique" ON "_MemberToVisit"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToVisit_B_index" ON "_MemberToVisit"("B");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToVisit" ADD CONSTRAINT "_MemberToVisit_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToVisit" ADD CONSTRAINT "_MemberToVisit_B_fkey" FOREIGN KEY ("B") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
