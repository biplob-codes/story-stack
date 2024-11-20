import { z } from "zod";

export const signupInput = z.object({
  name: z.string().min(3),
  email: z.string().email().max(100),
  password: z.string().min(8),
  bio: z.string().max(500).optional(),
  profileImage: z.string().optional(),
});
export const loginInput = z.object({
  email: z.string().email().max(100),
  password: z.string().min(8),
});

export const postInput = z.object({
  title: z.string().min(5),
  description: z.string(),
});
export type signupInput = z.infer<typeof signupInput>;
export type loginInput = z.infer<typeof loginInput>;
export type postInput = z.infer<typeof postInput>;
