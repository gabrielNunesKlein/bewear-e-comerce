'use client';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { useFinishOrder } from '@/hooks/mutatios/use-finish-order';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function FinishOrderButton() {

    const [openDialogSuccess, setOpenDialogSuccess] = useState(false)

    const finishOrder = useFinishOrder();

    const handleFinishOrder = () => {
        finishOrder.mutate()
        setOpenDialogSuccess(true)
    }


    return (
        <>
            <Button
                onClick={handleFinishOrder}
                size={'lg'}
                className='rounded-full w-full'
            >
                Finalizr Compra
            </Button>
            <Dialog open={openDialogSuccess} onOpenChange={setOpenDialogSuccess}>
                <DialogContent className='text-center'>
                    <Image 
                        src={'/illustration.svg'}
                        width={300}
                        height={300}
                        className='mx-auto'
                        alt='Sucess'
                    />
                    <DialogTitle className="mt-4 text-2xl">
                        Pedido Efetuado!
                    </DialogTitle>
                    <DialogDescription className='font-medium'>
                        Seu pedido foi efetuado com sucesso. Você pode acompanhar o status na seção de “Meus Pedidos”.
                    </DialogDescription>

                    <DialogFooter>
                        <Button className="rounded-full" size="lg">
                            Ver Compras
                        </Button>
                        <Button asChild size={'lg'} variant='outline' className='rounded-full'>
                            <Link href={'/'}>
                                Voltar Para Loja
                            </Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
