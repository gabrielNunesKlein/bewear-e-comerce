"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DecreaseProductCartQuantitySchema, decreaseProductCartQuantitySchema } from "./schema";

export const decreaseProductCartQuantity = async (data: DecreaseProductCartQuantitySchema) => {
    
    decreaseProductCartQuantitySchema.safeParse(data)

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user){
        throw new Error("Unoauthorized")
    }

    const cartItem = await db.query.cartItemTable.findFirst({
        where: (cart, { eq }) => eq(cart.id, data.cartItemId),
        with: {
            cart: true
        }
    })

    if(!cartItem){
        throw new Error("Product variant not found in cart")
    }

    if(cartItem?.cart.userId !== session.user.id){
        throw new Error('Unauthorized')
    }

    if(cartItem.quantity === 1){
        await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id))
    }

    await db.update(cartItemTable).set({ quantity: cartItem.quantity - 1})
        .where(eq(cartItemTable.id, cartItem.id))

}