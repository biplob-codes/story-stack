import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { postInput } from "@biplob-codes/story-stack-common";

export const postRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();
// const prisma = new PrismaClient({datasourceUrl:env.DATABASE_URL}).$extends(withAccelerate());
postRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const postObj = {
    title: body.title,
    description: body.description,
  };
  const { error } = postInput.safeParse(postObj);
  if (error) {
    return c.json({ error: error.issues });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = c.get("userId");

  const post = await prisma.post.create({
    data: { ...postObj, authorId: user },
  });
  return c.json({ post });
});
postRoutes.put("/:id", async (c) => {
  const postId = c.req.param("id");
  const body = await c.req.json();
  const postObj = {
    title: body.title,
    description: body.description,
  };
  const { error } = postInput.safeParse(postObj);
  if (error) {
    return c.json({ error: error.issues });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: postObj,
  });

  return c.json({ updatedPost });
});
postRoutes.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany();

  return c.json({ posts });
});
postRoutes.get("/:id", async (c) => {
  const postId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.findFirst({ where: { id: postId } });
  return c.json({ post });
});
