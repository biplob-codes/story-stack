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
