import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { ShoppingBasketIcon } from 'lucide-react'

export default function Cart() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <ShoppingBasketIcon />
                </Button>
            </SheetTrigger>
            <SheetContent></SheetContent>
        </Sheet>
    )
}
