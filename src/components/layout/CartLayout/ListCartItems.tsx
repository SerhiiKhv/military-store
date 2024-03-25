import Link from "next/link";
import {PencilIcon} from "@/components/icons/PencilIcon";
import {ChevronUpIcon} from "@/components/icons/ChevronUpIcon";
import {ChevronDownIcon} from "@/components/icons/ChevronDownIcon";
import {ShopItemType} from "@/components/Types/ShopItem";
import Image from "next/image";
import React, {useContext, useState} from "react";
import {CartContext} from "@/components/AppContext";

export default function ListCartItems() {

    const {cartProducts} = useContext(CartContext) as any;
    const [isCartPageOpen, setIsCartPageOpen] = useState(true)

    return (
        <div className="bg-white p-2 rounded-md">
            <div className="flex justify-between">
                <p>Ваше замовлення</p>
                <div className="flex gap-6">
                    <Link
                        href={'/cart'}
                        className="flex gap-1">
                        <PencilIcon/>
                        Редагувати
                    </Link>

                    {isCartPageOpen ? (
                        <div onClick={() => setIsCartPageOpen(false)}>
                            <ChevronUpIcon/>
                        </div>
                    ) : (
                        <div onClick={() => setIsCartPageOpen(true)}>
                            <ChevronDownIcon/>
                        </div>
                    )}
                </div>

            </div>

            {isCartPageOpen && (
                <div>
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
            )}
        </div>
    )
}