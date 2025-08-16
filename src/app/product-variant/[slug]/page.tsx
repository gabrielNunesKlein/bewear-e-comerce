import Header from '@/components/common/header'
import ProductList from '@/components/common/product-list'
import React from 'react'
import Image from 'next/image'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { productTable, productVariantTable } from '@/db/schema'
import { notFound } from 'next/navigation'
import { formatCentsToBRL } from '@/helpers/money'
import Footer from '@/components/common/footer'
import VariantSelector from './components/variant-selector'
import ProductActions from './components/production-action'

interface ProductVariantPageProps {
    params: Promise<{ slug: string }>
}

export default async function ProductVariantPage({ params }: ProductVariantPageProps) {

    const { slug } = await params

    const productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productVariantTable.slug, slug),
        with: {
            product: {
                with: {
                    variants: true,
                },
            },
        },
    });

    if (!productVariant) {
        return notFound();
    }

    const likelyProducts = await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant.product.categoryId),
        with: {
            variants: true,
        },
    });

    return (
      <>
        <Header />
        <div className="flex flex-col space-y-6">
          <div className="block space-y-6 md:flex flex-1">
            <Image
              src={productVariant.imageUrl.replace(/^\{+"?|"+\}$/g, "")}
              alt={productVariant.name}
              sizes="100vw"
              height={0}
              width={0}
              className="h-auto w-full object-cover md:h-[700px] md:w-[700px] rounded-4xl"
            />

            <div className="px-5 space-y-3 flex-1">
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
              <div>
                {/* DESCRIÇÃO */}
                <h2 className="text-lg font-semibold">
                  {productVariant.product.name}
                </h2>
                <h3 className="text-muted-foreground text-sm">
                  {productVariant.name}
                </h3>
                <h3 className="text-lg font-semibold">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </h3>
              </div>

              <ProductActions productVariantId={productVariant.id} />
              <p className="text-shadow-amber-600">
                {productVariant.product.description}
              </p>
            </div>
          </div>

          <ProductList title="Talvez você goste" products={likelyProducts} />

          <Footer />
        </div>
      </>
    );
}
