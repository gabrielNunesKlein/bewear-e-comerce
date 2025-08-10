'use client';

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { ShoppingBasketIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCart } from '@/actions/get-cart'
import CartItem from './cart-item';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { formatCentsToBRL } from '@/helpers/money';

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

                <div className="flex h-full flex-col gap-8 px-5 pb-5">
                    <div className="flex h-full max-h-full flex-col overflow-hidden">
                        <ScrollArea className='h-full'>
                            <div className="flex h-full flex-col gap-8">
                                {cart?.items.map((item) => (
                                    <CartItem 
                                        key={item.id}
                                        id={item.id}
                                        productName={item.productVariant.product.name}
                                        productVariantImageUrl={item.productVariant.imageUrl.replace(/^\{+"?|"+\}$/g, '')}
                                        productVariantName={item.productVariant.name}
                                        productVariantTotalPriceInCents={item.productVariant.priceInCents}
                                        quantity={item.quantity}
                                        productVariantId={item.productVariantId}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {cart?.items && cart?.items?.length > 0 && (
                        <div className='flex flex-col gap-4'>
                            <Separator />

                            <div className='flex items-center justify-between text-xs font-medium'>
                                <p>SubTotal</p>
                                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                            </div>

                            <Separator />

                            <div className='flex items-center justify-between text-xs font-medium'>
                                <p>Entrega</p>
                                <p>Gratis</p>
                            </div>

                            <Separator />

                            <div className='flex items-center justify-between text-xs font-medium'>
                                <p>SubTotal</p>
                                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                            </div>

                            <Button className='rounded-full mt-2'>
                                Finalizar Compra
                            </Button>

                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
