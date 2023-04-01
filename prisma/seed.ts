import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { SALT_ROUNDS } from "./SALT_ROUNDS";

const db = new PrismaClient();

type Task = {
  title: string;
  note?: string;
  dueDate: Date;
  estimatedCost: string;
  status: {
    connect: {
      id: number;
    };
  };
  labels: {
    connect: {
      id: number;
    }[];
  };
  effort: {
    connect: {
      id: number;
    };
  };
};

async function main() {
  await db.user.create({
    data: {
      email: "github@dollardojo.tech",
      password: await hash("thisismypassword", SALT_ROUNDS),
    },
  });

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

  await db.effort.create({
    data: {
      name: "sm",
    },
  });

  await db.effort.create({
    data: {
      name: "md",
    },
  });

  await db.effort.create({
    data: {
      name: "lg",
    },
  });

  const tasks: Task[] = [
    {
      title: "Take Out the Trash",
      note: "The trash is overflowing.",
      dueDate: new Date("2023-04-01"),
      estimatedCost: "2,430",
      status: {
        connect: {
          id: firstStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }],
      },
      effort: {
        connect: {
          id: 2,
        },
      },
    },
    {
      title: "Clean the House",
      dueDate: new Date("2023-04-05"),
      note: "The house is a mess.",
      estimatedCost: "2,431",
      status: {
        connect: {
          id: secondStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }, { id: secondLabel.id }],
      },
      effort: {
        connect: {
          id: 2,
        },
      },
    },
    {
      title: "Mow the Yard",
      dueDate: new Date("2023-04-20"),
      note: "The grass is getting long.",
      estimatedCost: "2,433",
      status: {
        connect: {
          id: firstStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }, { id: thirdLabel.id }],
      },
      effort: {
        connect: {
          id: 2,
        },
      },
    },
    {
      title: "Purchase Christmas Tree",
      dueDate: new Date("2023-06-01"),
      note: "The grass is getting long.",
      estimatedCost: "2,433",
      status: {
        connect: {
          id: firstStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }, { id: thirdLabel.id }],
      },
      effort: {
        connect: {
          id: 2,
        },
      },
    },
    {
      title: "Purchase Christmas Tree",
      dueDate: new Date("2023-12-01"),
      note: "The grass is getting long.",
      estimatedCost: "2,433",
      status: {
        connect: {
          id: firstStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }, { id: thirdLabel.id }],
      },
      effort: {
        connect: {
          id: 2,
        },
      },
    },
    {
      title: "Purchase Christmas Tree",
      dueDate: new Date("2024-12-01"),
      note: "The grass is getting long.",
      estimatedCost: "2,433",
      status: {
        connect: {
          id: firstStatus.id,
        },
      },
      labels: {
        connect: [{ id: firstLabel.id }, { id: thirdLabel.id }],
      },
      effort: {
        connect: {
          id: 2,
        },
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
