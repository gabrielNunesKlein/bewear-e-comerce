import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { formatCentsToBRL } from '@/helpers/money';

interface CartItemProps {
    id: string;
    productName: string;
    productVariantName: string;
    productVariantImageUrl: string;
    productVariantTotalPriceInCents: number;
    quantity: number;
}

export default function CartItem({ id, productName, productVariantImageUrl, productVariantName, productVariantTotalPriceInCents, quantity }: CartItemProps) {
    return (
        <div className='flex items-center justify-between'>
            <div className="flex items-center gap-4">
                <Image 
                    src={productVariantImageUrl}
                    alt={productVariantName}
                    width={78}
                    height={78}
                    className='rounded-lg'
                />

                <div className='flex flex-col gap-1'>
                    <p className='text-sm font-semibold'>{productName}</p>
                    <p className='text-muted-foreground text-sm font-medium'>
                        {productVariantName}
                    </p>

                    <div className="flex w-[100px] p-1 items-center justify-between rounded-lg border">
                        <Button className='h-4 w-4' size="icon" variant="ghost" onClick={() => {}}>
                            <MinusIcon />
                        </Button>
                        <p className='text-xs'>{quantity}</p>
                        <Button className='h-4 w-4' size="icon" variant="ghost" onClick={() => {}}>
                            <PlusIcon />
                        </Button>
                    </div>

                </div>

            </div>

            <div className='flex flex-col justify-center items-end gap-1'>
                <Button variant={'outline'} size={'icon'}>
                    <TrashIcon />
                </Button>
                <p className="text-xs font-bold">
                    {formatCentsToBRL(productVariantTotalPriceInCents * quantity)}
                </p>
            </div>

        </div>
    )
}
