'use client';
import { createCheckoutSession } from '@/actions/create-checkout-session';
import { Button } from '@/components/ui/button'
import { useFinishOrder } from '@/hooks/mutatios/use-finish-order';
import React from 'react'
import { loadStripe } from "@stripe/stripe-js";

export default function FinishOrderButton() {

    const finishOrder = useFinishOrder();

    const handleFinishOrder = async () => {

        if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
            throw new Error("Stripe publishable key is not set");
        }

        const { orderId } = await finishOrder.mutateAsync()

        const checkoutSession = await createCheckoutSession({
            orderId
        })


        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        );

        if (!stripe) {
            throw new Error("Failed to load Stripe");
        }

        await stripe.redirectToCheckout({
            sessionId: checkoutSession.id,
        });

    }


    return (
        <>
            <Button
                onClick={handleFinishOrder}
                disabled={finishOrder.isPending}
                size={'lg'}
                className='rounded-full w-full'
            >
                Finalizr Compra
            </Button>
        </>
    )
}
