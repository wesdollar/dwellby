/*
  Warnings:

  - You are about to drop the `LevelOfEffort` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `levelOfEffortId` on the `TaskItem` table. All the data in the column will be lost.
  - Added the required column `effortId` to the `TaskItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LevelOfEffort";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Effort" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "statusId" INTEGER NOT NULL,
    "effortId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TaskItem_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskItem_effortId_fkey" FOREIGN KEY ("effortId") REFERENCES "Effort" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskItem" ("createdAt", "dueDate", "id", "statusId", "title", "updatedAt") SELECT "createdAt", "dueDate", "id", "statusId", "title", "updatedAt" FROM "TaskItem";
DROP TABLE "TaskItem";
ALTER TABLE "new_TaskItem" RENAME TO "TaskItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
