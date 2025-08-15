'use server'
import { auth } from "@/lib/auth";
import { createCheckoutSessionSchema, CreateCheckoutSessionSchema } from "./schema";
import { headers } from "next/headers";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { orderItemTable, orderTable } from "@/db/schema";
import Stripe from 'stripe'

export const createCheckoutSession = async (data: CreateCheckoutSessionSchema) => {

    if(!process.env.STRIPE_SECRET_KEY){
        throw new Error("Stripe secret key is not set");
    }

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user){
        throw new Error("Unauthorized");
    }

    const { orderId } = createCheckoutSessionSchema.parse(data);

    const order = await db.query.orderTable.findFirst({
        where: eq(orderTable.id, orderId)
    })

    if(!order){
        throw new Error("Order not found");
    }

    if(order.userId != session.user.id){
        throw new Error("Unauthorized");
    }

    const orderItems = await db.query.orderItemTable.findMany({
        where: eq(orderItemTable.orderId, orderId),
        with: {
            productVariant: { with: { product: true }}
        }
    })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'boleto'],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        metadata: {
            orderId
        },
        line_items: orderItems.map((order) => {
            return {
                price_data: {
                    currency: 'BRL',
                    product_data: {
                        name: `${order.productVariant.product.name} - ${order.productVariant.name}`,
                        description: order.productVariant.product.description,
                        images: [order.productVariant.imageUrl.replace(/^\{+"?|"+\}$/g, '')]
                    },

                    // Caso em centavos
                    unit_amount: order.priceInCents
                },
                quantity: order.quantity
            }
        })
    })

    return checkoutSession

}