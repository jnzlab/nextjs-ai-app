import * as z from 'zod';

export const userSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.email(),
    age: z.int().min(18).max(60),
});
