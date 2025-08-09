"use client"

import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

export default function QiantitySelector() {

    const [quantity, setQuantity] = useState(1)

    function handleIncrement(){
        setQuantity((prev) => prev + 1)
    }

    function handleDecrement(){
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
    }

    return (
        <div className="space-y-4">
            <h3 className="font-medium">Quantidade</h3>
            <div className="flex w-[100px] items-center justify-between rounded-lg border">
                <Button size="icon" variant="ghost" onClick={handleDecrement}>
                    <MinusIcon />
                </Button>
                <p>{quantity}</p>
                <Button size="icon" variant="ghost" onClick={handleIncrement}>
                    <PlusIcon />
                </Button>
            </div>
        </div>
    )
}
