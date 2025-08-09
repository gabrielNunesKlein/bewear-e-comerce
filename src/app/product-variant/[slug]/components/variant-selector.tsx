import { productVariantTable } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

export default function VariantSelector({ selectedVariantSlug, variants }: VariantSelectorProps) {

    return (
        <div className='flex items gap-4'>
            {variants.map((variant) => (
                <Link
                    href={`/product-variant/${variant.slug}`}
                    key={variant.id}
                    className={
                        selectedVariantSlug === variant.slug
                        ? "border-primary rounded-xl border-2"
                        : ""
                    }
                >
                 <Image 
                    width={68}
                    height={68}
                    src={variant.imageUrl.replace(/^\{+"?|"+\}$/g, '')}
                    alt={variant.name}
                    className='rounded-xl'
                 />   
                </Link>
            ))}
        </div>
    )
}
