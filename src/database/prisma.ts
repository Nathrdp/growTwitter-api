import { PrismaPg } from "@prisma/adapter-pg";
import * as prismaClient from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const PrismaClient = (prismaClient as any).PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;