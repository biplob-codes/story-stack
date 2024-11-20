import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    bio: z.ZodOptional<z.ZodString>;
    profileImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    bio?: string | undefined;
    profileImage?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    bio?: string | undefined;
    profileImage?: string | undefined;
}>;
export declare const loginInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const postInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export type signupInput = z.infer<typeof signupInput>;
export type loginInput = z.infer<typeof loginInput>;
export type postInput = z.infer<typeof postInput>;
