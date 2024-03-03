'use client'

import {SectionHeader} from "@/components/layout/DopLayout/SectionHeader";
import React, {useContext} from "react";
import {CartContext, cartProductPrice} from "@/components/AppContext";
import Image from "next/image";

export default function CartPage() {

    const {cartProducts, removeCartProduct} = useContext(CartContext) as any;

    let total = 0

    for(const p of cartProducts){
        total += cartProductPrice(p)
    }

    return (
        <section className="mt-8">
            <SectionHeader mainHeader="Cart"/>
            <div className="grid grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product: any, index: number) => (
                        <div className="flex items-center gap-4 mb-4 border-b py-2">
                            <div>
                                {/*product.item.image || */}
                                <Image src={'/pizza.png'}
                                       alt={"Img menu item"}
                                       width={250} height={250}
                                       className="w-24"/>
                            </div>
                            <div className="grow">
                                <h3> {/*{product.item.name}*/} name</h3>
                            </div>
                            <div>{cartProductPrice(product)}$</div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => removeCartProduct(index)}
                                >Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div>
                        Subtotal: {total}$
                    </div>
                </div>
                <div>
                    right
                </div>
            </div>
        </section>
    )
}