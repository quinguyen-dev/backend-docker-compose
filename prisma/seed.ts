import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      username: "admin1",
    },
    update: {},
    create: {
      username: "admin1",
      firstName: "First Name",
      lastName: "Last Name",
    },
  });

  await prisma.user.upsert({
    where: {
      username: "admin2",
    },
    update: {},
    create: {
      username: "admin2",
      firstName: "First Name",
      lastName: "Last Name",
    },
  });
  console.log("This has ran");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
