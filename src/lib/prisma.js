import { PrismaClient } from '../generated/prisma/index.js';

const globalForPrisma = global;

/**
 * Prisma Client singleton to prevent multiple instances in development
 * @type {PrismaClient}
 */
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
