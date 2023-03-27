import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const firstLabel = await db.label.create({
    data: {
      name: "Household",
    },
  });

  const secondLabel = await db.label.create({
    data: {
      name: "Yardwork",
    },
  });

  const thirdLabel = await db.label.create({
    data: {
      name: "Kitchen Tasks",
    },
  });

  const statuses = [
    "To Do",
    "In Progress",
    "Done",
    "Blocked",
    "Cancelled",
    "On Hold",
  ];

  const firstStatus = await db.status.create({
    data: {
      name: statuses[0],
    },
  });

  const secondStatus = await db.status.create({
    data: {
      name: statuses[1],
    },
  });

  // TODO: type safety
  const tasks = [
    {
      title: "Take Out the Trash",
      dueDate: new Date("2023-04-01"),
      status: {
        connect: {
          id: firstStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }],
      },
    },
    {
      title: "Clean the House",
      dueDate: new Date("2023-04-01"),
      status: {
        connect: {
          id: secondStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }, { id: secondLabel.id }],
      },
    },
    {
      title: "Mow the Yard",
      dueDate: new Date("2023-04-20"),
      status: {
        connect: {
          id: firstStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }, { id: thirdLabel.id }],
      },
    },
  ];

  for (const task of tasks) {
    await db.taskItem.create({
      data: task,
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
