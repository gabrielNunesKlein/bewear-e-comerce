"use client";

import { addProductToCart } from '@/actions/add-cart-product';
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react'

interface AddToCartButtonProps {
    productVariantId: string;
    quantity: number;
}

export default function AddToCartButton({ productVariantId, quantity }: AddToCartButtonProps) {

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ["addProductToCart", productVariantId, quantity],
        mutationFn: () => 
            addProductToCart({
                productVariantId,
                quantity
            }),

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cart"] })
            }
    })

    return (
        <Button onClick={() => mutate()} disabled={isPending} className="rounded-full" size="lg" variant="outline">
            {isPending && <Loader2 className='animate-spin' />}
            Adicionar à sacola
        </Button>
    )
}
