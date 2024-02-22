'use client'

import {SectionHeader} from "@/components/layout/SectionHeader";
import React, {useContext, useState} from "react";
import {CartContext, cartProductPrice} from "@/components/AppContext";
import Image from "next/image";
import {ExtraPriceType} from "@/components/Types/ShopItem";

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
                                <Image src={product.item.image || '/pizza.png'}
                                       alt={"Img menu item"}
                                       width={250} height={250}
                                       className="w-24"/>
                            </div>
                            <div className="grow">
                                <h3> {product.item.name}</h3>

                                {product.size && (
                                    <div>
                                        Size: <span>{product.size}</span>
                                    </div>
                                )}

                                <h1>Ingredients:</h1>
                                {product.extras && product.extras.map((ingredient: ExtraPriceType) =>
                                    <div>
                                        <span>{ingredient.name}: {ingredient.price}$</span>
                                    </div>
                                )}
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