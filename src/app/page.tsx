'use server'
import CategorySelector from "@/components/common/category-selector";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

export default async function Home() {

  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full object-fill object-center md:max-h-[1200px]"
          />
        </div>

        <ProductList products={products} title="Mais Vendidos" />

        <div className="flex px-5 md:hidden">
          <CategorySelector categories={categories} />
        </div>

        <div className="grid grid-cols-1 gap-3 px-5 md:grid-cols-2 md:px-0">
          <div className="hidden w-full flex-col space-y-3 md:flex">
            <Image
              src="/tenis-02.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full object-fill md:max-h-[307px]"
            />
            <Image
              src="/tenis-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full object-fill md:max-h-[307px]"
            />
          </div>
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full md:max-h-[638px]"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
    </>
  );
}
