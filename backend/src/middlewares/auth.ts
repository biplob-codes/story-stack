import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { getBearerToken } from "../utils";

export const authUser = createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization") || "";
  if (!token) {
    return c.json({ error: "Access denied. No token provided." });
  }
  try {
    const result = await verify(getBearerToken(token), c.env.JWT_SECRET_KEY);
    c.set("userId", result.id);

    await next();
  } catch (err) {
    return c.json({ error: "Invalid credentials" });
  }
});
