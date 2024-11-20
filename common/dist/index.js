"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInput = exports.loginInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(8),
    bio: zod_1.z.string().max(500).optional(),
    profileImage: zod_1.z.string().optional(),
});
exports.loginInput = zod_1.z.object({
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(8),
});
exports.postInput = zod_1.z.object({
    title: zod_1.z.string().min(5),
    description: zod_1.z.string(),
});
