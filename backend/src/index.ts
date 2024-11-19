import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();
// const prisma = new PrismaClient({datasourceUrl:env.DATABASE_URL}).$extends(withAccelerate());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
