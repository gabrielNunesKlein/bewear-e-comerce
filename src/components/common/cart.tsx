'use client';

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { ShoppingBasketIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCart } from '@/actions/get-cart'
import Image from 'next/image'
import CartItem from './cart-item';

export default function Cart() {

    const { data: cart } = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart(),
    })

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <ShoppingBasketIcon />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        Carrinho
                    </SheetTitle>
                </SheetHeader>
                <div className='space-y-4 px-5'>
                    {cart?.items.map((item) => (
                        <CartItem 
                            key={item.id}
                            id={item.id}
                            productName={item.productVariant.product.name}
                            productVariantImageUrl={item.productVariant.imageUrl.replace(/^\{+"?|"+\}$/g, '')}
                            productVariantName={item.productVariant.name}
                            productVariantTotalPriceInCents={item.productVariant.priceInCents}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
