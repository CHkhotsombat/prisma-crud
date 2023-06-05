import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      firstName: 'Alice',
      lastName: 'Border',
    },
  })
  const admin = await prisma.user.upsert({
    where: { email: 'admin@email.co' },
    update: {},
    create: {
      email: 'admin@email.co',
      firstName: 'Admin',
      lastName: 'Admin',
      role: 'ADMIN',
    }
  })
  console.log({ alice, admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
