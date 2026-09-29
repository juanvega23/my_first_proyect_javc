import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Tech Solutions',
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Marketing Pro',
    },
  });

  const tenant3 = await prisma.tenant.create({
    data: {
      name: 'Consulting Experts',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@email.com',
      password: password,
      telephone: '88888888',
      role: Role.ADMIN,
      tenantId: tenant1.id,
    },
  });

  await prisma.user.create({
    data: {
      name: 'Usuario Uno',
      email: 'usuario1@email.com',
      password: password,
      telephone: '77777777',
      role: Role.USER,
      tenantId: tenant2.id,
    },
  });

  await prisma.user.create({
    data: {
      name: 'Usuario Dos',
      email: 'usuario2@email.com',
      password: password,
      telephone: '66666666',
      role: Role.USER,
      tenantId: tenant3.id,
    },
  });

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });