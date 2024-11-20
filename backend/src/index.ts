import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userRoutes } from "./routes/user";
import { postRoutes } from "./routes/post";
import { authUser } from "./middlewares/auth";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();
// const prisma = new PrismaClient({datasourceUrl:env.DATABASE_URL}).$extends(withAccelerate());
app.use("/api/v1/posts/*", authUser);

app.route("/api/v1/users", userRoutes);
app.route("/api/v1/posts", postRoutes);

export default app;
