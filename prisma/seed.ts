import { hash } from "bcrypt";
import { SALT_ROUNDS } from "./SALT_ROUNDS";

const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

export async function seed() {
  const statuses = [
    { name: "To Do" },
    { name: "In Progress" },
    { name: "Done" },
    { name: "Blocked" },
    { name: "Cancelled" },
    { name: "On Hold" },
  ];

  const createdStatuses = [];

  for (const statusData of statuses) {
    createdStatuses.push(await db.status.create({ data: statusData }));
  }

  const effortSizes = [{ name: "sm" }, { name: "md" }, { name: "lg" }];
  const createdEffortSizes = [];

  for (const effortSizeData of effortSizes) {
    createdEffortSizes.push(await db.effort.create({ data: effortSizeData }));
  }

  console.log(JSON.stringify(createdStatuses, null, 2));
  console.log(JSON.stringify(createdEffortSizes, null, 2));

  const users = [
    {
      name: "Wes",
      email: process.env.SEED_EMAIL_WES,
      password: await hash(
        process.env.SEED_PASSWORD_WES as string,
        SALT_ROUNDS
      ),
      taskItems: {
        create: [
          {
            title: "Mow Front Yard",
            note: undefined,
            dueDate: new Date("2023-04-27"),
            estimatedCost: undefined,
            labels: {
              connectOrCreate: [
                { where: { name: "Outside" }, create: { name: "Outside" } },
                { where: { name: "Yard" }, create: { name: "Yard" } },
              ],
            },
            status: { connect: { id: createdStatuses[1].id } },
            effort: { connect: { id: createdEffortSizes[1].id } },
          },
          {
            title: "Powerwash Deck",
            note: undefined,
            dueDate: new Date("2023-04-27"),
            estimatedCost: undefined,
            labels: {
              connectOrCreate: [
                { where: { name: "Outside" }, create: { name: "Outside" } },
              ],
            },
            status: { connect: { id: createdStatuses[1].id } },
            effort: { connect: { id: createdEffortSizes[0].id } },
          },
        ],
      },
    },
    {
      name: "Lulu",
      email: process.env.SEED_EMAIL_LUNA,
      password: await hash(
        process.env.SEED_PASSWORD_LUNA as string,
        SALT_ROUNDS
      ),
    },
  ];

  for (const user of users) {
    await db.user.create({ data: user });
  }
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
