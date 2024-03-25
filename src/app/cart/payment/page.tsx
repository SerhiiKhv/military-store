'use client'

import {ShopItemType} from "@/components/Types/ShopItem";
import Image from "next/image";
import React, {useContext} from "react";
import {CartContext} from "@/components/AppContext";
import {PencilIcon} from "@/components/icons/PencilIcon";
import Link from "next/link";

export default function PaymentPage() {

    const {cartProducts} = useContext(CartContext) as any;

    let total = 0

    for (const p of cartProducts) {
        total += p.price
    }

    return (
        <section className="bg-gray-100 pt-4">
            <div className="my-container">
                <p className="text-xl">Оформити замовлення</p>
                <div className="grid grid-cols-[3fr,1fr] gap-4">
                    <div>
                        <div className="bg-white p-2 rounded-md">
                            <div className="flex justify-between">
                                <p>Ваше замовлення</p>
                                <Link
                                    href={'/cart'}
                                    className="flex gap-1">
                                    <PencilIcon/>
                                    Редагувати
                                </Link>
                            </div>

                            {cartProducts?.length === 0 && (
                                <div>No products in your shopping cart</div>
                            )}
                            {cartProducts?.length > 0 && cartProducts.map((product: ShopItemType) => (
                                <div className="grid grid-cols-[3fr,1fr] gap-4 mb-4 border-b py-2 rounded-md">
                                    <div className="flex gap-4 p-2">
                                        <Image src={product.image || '/pizza.png'}
                                               alt={"Img menu item"}
                                               width={250} height={250}
                                               className="w-24"/>

                                        <div className="grow">
                                            <h3> {product.name} name</h3>

                                            <p className="text-gray-400 text-sm mt-1">Код товара: 1111111</p>
                                        </div>
                                    </div>


                                    <div className="flex font-semibold items-center justify-end px-5 text-xl">
                                        {product.price} ₴
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white mt-6 p-8 rounded-md">
                            <p className="text-xl">1. Контактна інформація</p>

                            <div className="flex gap-2 items-center justify-between">
                                <div className="w-full">
                                    <label>Номер телефону</label>
                                    <input type="text"/>
                                </div>

                                <div className="w-full">
                                    <label>Ім'я</label>
                                    <input type="text"/>
                                </div>

                                <div className="w-full">
                                    <label>Email</label>
                                    <input type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white mt-6 p-2 rounded-md">
                            <p className="text-xl">2. Спосіб достаки</p>

                            <div>
                                <div className="border rounded-md p-2">
                                    <div className="flex gap-2">
                                        <input type="radio"/>
                                        <p>До відділення нової пошти</p>
                                    </div>

                                    <div>
                                        <div className="flex gap-2 items-center justify-between">
                                            <div className="w-full">
                                                <label>Дата доставки</label>
                                                <input type="text"/>
                                            </div>

                                            <div className="w-full">
                                                <label>Номер відділення</label>
                                                <input type="text"/>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 items-center justify-between">
                                            <div className="w-full">
                                                <label>Прізвище</label>
                                                <input type="text"/>
                                            </div>

                                            <div className="w-full">
                                                <label>Ім'я</label>
                                                <input type="text"/>
                                            </div>

                                            <div className="w-full">
                                                <label>По батькові</label>
                                                <input type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="border rounded-md p-2 mt-4">
                                    <div>
                                        <div className="flex gap-2">
                                            <input type="radio"/>
                                            <p>Курєр нової пошти</p>
                                        </div>

                                        <div>
                                            <div className="flex gap-2 items-center justify-between">
                                                <div className="w-full">
                                                    <label>Дата доставки</label>
                                                    <input type="text"/>
                                                </div>

                                                <div className="w-full">
                                                    <label>Час</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 items-center justify-between">
                                                <div className="w-full">
                                                    <label>Адресса достаки</label>
                                                    <input type="text" placeholder="Адресса"/>
                                                </div>

                                                <div className="w-full">
                                                    <input type="text" placeholder="Буд."/>
                                                </div>

                                                <div className="w-full">
                                                    <input type="text" placeholder="Кв."/>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 items-center justify-between">
                                                <div className="w-full">
                                                    <label>Прізвище</label>
                                                    <input type="text"/>
                                                </div>

                                                <div className="w-full">
                                                    <label>Ім'я</label>
                                                    <input type="text"/>
                                                </div>

                                                <div className="w-full">
                                                    <label>По батькові</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white mt-6 p-2 rounded-md">
                            <p className="text-xl">3. Спосіб оплати</p>

                            <div className="flex gap-2 border rounded-md p-4">
                                <input type="radio"/>
                                <p>Оплата при отриманні</p>
                            </div>

                            <div className="flex gap-2 mt-4 border rounded-md p-4">
                                <input type="radio"/>
                                <p>Онлайн оплата</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md max-h-96">
                        <div className="m-4 p-3">
                            <p className="text-2xl">Разом:</p>

                            <div className="flex justify-between pt-8">
                                <p>{cartProducts.length} товари на суму</p>
                                <p>{total} ₴</p>
                            </div>

                            <div className="flex justify-between pt-2">
                                <p>Знижка</p>
                                <p>0 ₴</p>
                            </div>

                            <div className="flex justify-between pt-2">
                                <p>Вартість доставки</p>
                                <p>0 ₴</p>
                            </div>

                            <div className="flex justify-between pt-12 font-semibold">
                                <p>До сплати</p>
                                <p className="text-xl">{total} ₴</p>
                            </div>

                            <button type='button'
                                    className="buttonWithoutP w-full p-4 text-center mt-6">
                                Оформити замовлення
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}