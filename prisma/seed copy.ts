import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function firstLabel() {
  const firstLabel = await db.label.create({
    data: {
      name: "First Label",
    },
  });

  return firstLabel;
}

async function secondLabel() {
  const secondLabel = await db.label.create({
    data: {
      name: "Second Label",
    },
  });

  return secondLabel;
}

async function firstStatus() {
  const firstStatus = await db.status.create({
    data: {
      name: "To Do",
    },
  });

  return firstStatus;
}

async function getTasks() {
  const firstLabelRecord = await firstLabel();
  const secondLabelRecord = await secondLabel();
  const status = await firstStatus();

  return [
    {
      title: "First Task",
      dueDate: new Date("2023-04-01"),
      labels: {
        connect: {
          id: firstLabelRecord.id,
        },
      },
      status: {
        connect: {
          id: status.id,
        },
      },
    },
    {
      title: "Second Task",
      dueDate: new Date("2023-04-02"),
      labels: {
        connect: {
          id: secondLabelRecord.id,
        },
      },
      status: {
        connect: {
          id: status.id,
        },
      },
    },
  ];
}

async function seed() {
  const tasks = await getTasks();

  console.log(tasks, null, 2);

  tasks.map(async (taskItem) =>
    db.taskItem.create({
      data: taskItem,
    })
  );
}

seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
