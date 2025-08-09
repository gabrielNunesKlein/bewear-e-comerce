'use client';

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { ShoppingBasketIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCart } from '@/actions/get-cart'
import Image from 'next/image'

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
                <div>
                    {cart?.items.map((item) => (
                        <div key={item.id}>
                            <Image 
                                width={68}
                                height={68}
                                src={item.productVariant.imageUrl.replace(/^\{+"?|"+\}$/g, '')}
                                alt={item.productVariant.name}
                            />

                            <p>
                                {item.productVariant.name}
                            </p>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
