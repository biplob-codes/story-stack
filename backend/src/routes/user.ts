import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { loginInput, signupInput } from "../zod";
import { sign } from "hono/jwt";
import { setBearerToken } from "../utils";

export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();
// const prisma = new PrismaClient({datasourceUrl:env.DATABASE_URL}).$extends(withAccelerate());

userRoutes.post("/signup", async (c) => {
  const body = await c.req.json();
  const userObj = {
    name: body.name,
    email: body.email,
    password: body.password,
    bio: body.bio,
    profileImage: body.profileImage,
  };
  const { error } = signupInput.safeParse(userObj);
  if (error) {
    return c.json({ error: error.issues });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.create({
      data: userObj,
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
    return c.json({ message: "Sign up successful", token: "Bearer " + token });
  } catch (err) {
    console.error(err);
    return c.json({ error: "An internal server error occurred." }, 500);
  }
});
userRoutes.post("/login", async (c) => {
  const body = await c.req.json();
  const userObj = {
    email: body.email,
    password: body.password,
  };
  const { error } = loginInput.safeParse(userObj);
  if (error) {
    return c.json({ error: error.issues });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userObj.email,
      },
    });
    if (!user || user.password !== userObj.password) {
      return c.json({ message: "Invalid credentials" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
    return c.json({
      message: "Login successful",
      token: setBearerToken(token),
    });
  } catch (err) {
    console.error(err);
    return c.json({ error: "An internal server error occurred." }, 500);
  }
});
