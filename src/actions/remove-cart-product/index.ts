"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { removeProductFromCartSchema, RemoveProductFromCartSchema } from "./schema";
import { cartItemTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const removeProdtFromCart = async (data: RemoveProductFromCartSchema) => {
    
    removeProductFromCartSchema.safeParse(data)

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


    if(cartItem?.cart.userId !== session.user.id){
        throw new Error('Unauthorized')
    }

    if(!cartItem){
        throw new Error("Product variant not found in cart")
    }

    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id))


}