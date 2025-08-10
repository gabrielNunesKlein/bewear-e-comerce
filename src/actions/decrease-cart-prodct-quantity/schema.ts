import z from "zod";


export const decreaseProductCartQuantitySchema = z.object({
    cartItemId: z.uuid(),
})

export type DecreaseProductCartQuantitySchema = z.infer<typeof decreaseProductCartQuantitySchema>;