import { PrismaPg } from "@prisma/adapter-pg";
import prisma_pkg from "@prisma/client";
const { PrismaClient } = prisma_pkg;
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;