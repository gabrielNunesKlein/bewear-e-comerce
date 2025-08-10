import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { formatCentsToBRL } from '@/helpers/money';
import { toast } from 'sonner';
import { useRemoveProductFromCart } from '@/hooks/mutatios/use-remove-product-from-cart';
import { useDecreaseCartProduct } from '@/hooks/mutatios/use-decrease-cart-product';
import { useIncreaseCartProduct } from '@/hooks/mutatios/use-increase-cart-product';

interface CartItemProps {
    id: string;
    productName: string;
    productVariantName: string;
    productVariantImageUrl: string;
    productVariantTotalPriceInCents: number;
    quantity: number;
    productVariantId: string;
}

export default function CartItem({ id, productVariantId, productName, productVariantImageUrl, productVariantName, productVariantTotalPriceInCents, quantity }: CartItemProps) {

    const removeProductFromCartMutation = useRemoveProductFromCart(id)
    const decreaseCartProductQuantity = useDecreaseCartProduct(id)
    const incrementCartProductQuantity = useIncreaseCartProduct(productVariantId)


    const handleDeleteClick = () => {
        removeProductFromCartMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Produto Removido do carrinho")
            },

            onError: () => {
                toast.error("Error ao remover produto do carrinho")
            }
        })
    }

    const handleDeceaseCartQuantityClick = () => {
        decreaseCartProductQuantity.mutate()
    }

    const handleIncrementCartQuantityClick = () => {
        incrementCartProductQuantity.mutate()
    }

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
                        <Button className='h-4 w-4' size="icon" variant="ghost" onClick={handleDeceaseCartQuantityClick}>
                            <MinusIcon />
                        </Button>
                        <p className='text-xs'>{quantity}</p>
                        <Button className='h-4 w-4' size="icon" variant="ghost" onClick={handleIncrementCartQuantityClick}>
                            <PlusIcon />
                        </Button>
                    </div>

                </div>

            </div>

            <div className='flex flex-col justify-center items-end gap-1'>
                <Button variant={'outline'} size={'icon'} onClick={handleDeleteClick}>
                    <TrashIcon />
                </Button>
                <p className="text-xs font-bold">
                    {formatCentsToBRL(productVariantTotalPriceInCents * quantity)}
                </p>
            </div>

        </div>
    )
}
