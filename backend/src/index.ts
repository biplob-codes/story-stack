import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userRoutes } from "./routes/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();
// const prisma = new PrismaClient({datasourceUrl:env.DATABASE_URL}).$extends(withAccelerate());

app.route("/api/v1/users", userRoutes);

export default app;
