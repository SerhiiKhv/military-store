'use client'

import React, {useContext} from "react";
import {CartContext} from "@/components/AppContext";
import Link from "next/link";
import Footer from "@/components/layout/MainPageLayout/Footer";
import {FaArrowLeftLong} from "react-icons/fa6";
import ListCartItems from "@/components/layout/CartLayout/ListCartItems";

export default function CartPage() {
    const {cartProducts} = useContext(CartContext) as any;

    let total = 0

    for (const p of cartProducts) {
        total += p.price
    }

    return (
        <section className="bg-gray-100 pt-4">
            <div className="mt-8 my-container">
                <div className="flex items-center justify-start gap-2">
                    <Link href={'/'}>
                        <FaArrowLeftLong className="h-6 w-6"/>
                    </Link>
                    <h1 className="font-semibold text-2xl">Кошик</h1>
                </div>


                <div className="grid sm:grid-cols-[2fr,1fr] grid-cols-1 gap-4">
                    <ListCartItems deleteButton={true}/>

                    <div className="bg-white rounded-md min-h-72 max-h-72">
                        <div className="m-4 p-3">
                            <Link type='button'
                                  href={'/cart/payment'}
                                  className="buttonWithoutP w-full p-4 text-center">
                                Перейти до оформлення
                            </Link>

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