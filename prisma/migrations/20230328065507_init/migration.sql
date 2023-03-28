/*
  Warnings:

  - Added the required column `levelOfEffortId` to the `TaskItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "LevelOfEffort" (
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
    "levelOfEffortId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TaskItem_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskItem_levelOfEffortId_fkey" FOREIGN KEY ("levelOfEffortId") REFERENCES "LevelOfEffort" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskItem" ("createdAt", "dueDate", "id", "statusId", "title", "updatedAt") SELECT "createdAt", "dueDate", "id", "statusId", "title", "updatedAt" FROM "TaskItem";
DROP TABLE "TaskItem";
ALTER TABLE "new_TaskItem" RENAME TO "TaskItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
