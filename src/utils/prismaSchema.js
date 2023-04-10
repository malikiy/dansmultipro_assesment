import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const users = prisma.users;
const jobs = prisma.jobs;

export {
    prisma,
    users,
    jobs
}