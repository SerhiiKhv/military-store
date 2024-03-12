'use client'

import React, {useContext} from "react";
import {CartContext} from "@/components/AppContext";
import Image from "next/image";
import {ShopItemType} from "@/components/Types/ShopItem";
import {DeleteIcon} from "@/components/icons/DeleteIcon";
import {ArrowLeftIcon} from "@/components/icons/ArrowLeftIcon";
import Link from "next/link";
import Footer from "@/components/layout/MainPageLayout/Footer";

export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext) as any;

    let total = 0

    for (const p of cartProducts) {
        total += p.price
    }


    return (
        <section className="bg-gray-100">
            <div className="mt-8 my-container">
                <div className="flex items-center justify-start gap-2">
                    <Link href={'/'}>
                        <ArrowLeftIcon/>
                    </Link>
                    <h1 className="font-semibold text-2xl">Кошик</h1>
                </div>


                <div className="grid grid-cols-[2fr,1fr] gap-4">
                    <div>
                        {cartProducts?.length === 0 && (
                            <div>No products in your shopping cart</div>
                        )}
                        {cartProducts?.length > 0 && cartProducts.map((product: ShopItemType, index: number) => (
                            <div className="grid grid-cols-[3fr,1fr] gap-4 mb-4 border-b py-2 bg-white rounded-md">
                                <div className="flex gap-4 p-2">
                                    <Image src={product.image || '/pizza.png'}
                                           alt={"Img menu item"}
                                           width={250} height={250}
                                           className="w-24"/>

                                    <div className="grow">
                                        <h3> {product.name} name</h3>

                                        <p className="text-gray-400 text-sm mt-1">Код товара: 1111111</p>
                                        <div>
                                            <button
                                                type="button"
                                                className="mt-4 delete flex items-center justify-center gap-1"
                                                onClick={() => removeCartProduct(index)}>
                                                <DeleteIcon/> Видалити
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex font-semibold items-center justify-end px-5 text-xl">
                                    {product.price} ₴
                                </div>
                            </div>
                        ))}
                    </div>




                    <div className="bg-white rounded-md h-2/3">
                        <div className="m-4 p-3">
                            <button type='button'
                                    className="buttonWithoutP w-full p-4">
                                Перейти до оформлення
                            </button>

                            <div className="flex justify-between pt-8">
                                <p>{cartProducts.length} товари на суму</p>
                                <p>{total} ₴</p>
                            </div>

                            <div className="flex justify-between pt-2">
                                <p>Знижка</p>
                                <p>0 ₴</p>
                            </div>

                            <div className="flex justify-between pt-12 font-semibold">
                                <p>Загальна сума</p>
                                <p className="text-xl">{total} ₴</p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </section>
    )
}