import Link from "next/link";
import {ShopItemType} from "@/components/Types/ShopItem";
import Image from "next/image";
import React, {useContext, useState} from "react";
import {CartContext} from "@/components/AppContext";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {HiOutlinePencil} from "react-icons/hi";

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
                        <HiOutlinePencil className='h-5 w-5'/>
                        Редагувати
                    </Link>

                    {isCartPageOpen ? (
                        <div onClick={() => setIsCartPageOpen(false)}>
                            <FaChevronUp />
                        </div>
                    ) : (
                        <div onClick={() => setIsCartPageOpen(true)}>
                            <FaChevronDown />
                        </div>
                    )}
                </div>

            </div>

            {isCartPageOpen && (
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product: ShopItemType, index: number) => (
                        <div className="grid grid-cols-[3fr,1fr] gap-4 mb-4 border-b py-2 rounded-md" key={index}>
                            <div className="flex gap-4 p-2">
                                <Image src={product.image[0] || '/pizza.png'}
                                       alt={"Img menu item"}
                                       width={250} height={250}
                                       className="w-24"/>

                                <div className="grow">
                                    <h3>{product.name}</h3>

                                    <p className="text-gray-400 text-sm mt-1">Код товара: {product.cod}</p>
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