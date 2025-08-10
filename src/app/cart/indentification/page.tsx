import Header from '@/components/common/header';
import React from 'react'
import Addresses from './components/addresses';
import Footer from '@/components/common/footer';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { shippingAddressTable } from '@/db/schema';
import CartSummary from '../components/cart-summary';

export default async function CartIndentificationPage() {

      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user.id) {
        redirect("/");
      }
      const cart = await db.query.cartTable.findFirst({
        where: (cart, { eq }) => eq(cart.userId, session.user.id),
        with: {
          shippingAddress: true,
          items: {
            with: {
              productVariant: {
                with: {
                  product: true,
                },
              },
            },
          },
        },
      });
      if (!cart || cart?.items.length === 0) {
        redirect("/");
      }
      const shippingAddresses = await db.query.shippingAddressTable.findMany({
        where: eq(shippingAddressTable.userId, session.user.id),
      });

      const cartTotalInCents = cart.items.reduce(
        (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
        0,
      );

    return (
      <div>
        <Header />
        <div className="space-y-4 px-5">
          <Addresses
            shippingAddresses={shippingAddresses}
            defaultShippingAddressId={cart.shippingAddress?.id || null}
          />
          <CartSummary
            subtotalInCents={cartTotalInCents}
            totalInCents={cartTotalInCents}
            products={cart.items.map((item) => ({
              id: item.productVariant.id,
              name: item.productVariant.product.name,
              variantName: item.productVariant.name,
              quantity: item.quantity,
              priceInCents: item.productVariant.priceInCents,
              imageUrl: item.productVariant.imageUrl.replace(/^\{+"?|"+\}$/g, ''),
            }))}
          />
        </div>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    );
}
