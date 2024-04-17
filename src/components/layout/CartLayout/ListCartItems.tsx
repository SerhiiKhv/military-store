import {ShopItemType} from "@/components/Types/ShopItem";
import Image from "next/image";
import React, {useContext} from "react";
import {CartContext} from "@/components/AppContext";
import {MdDeleteForever} from "react-icons/md";

export default function ListCartItems(
    {deleteButton}: { deleteButton?: boolean }
) {

    const {cartProducts, removeCartProduct} = useContext(CartContext) as any;

    return (
        <div className="bg-white p-2 rounded-md">
            <div>
                {cartProducts?.length === 0 && (
                    <div>No products in your shopping cart</div>
                )}
                {cartProducts?.length > 0 && cartProducts.map((product: ShopItemType, index: number) => (
                    <div key={index}>
                        <div className="hidden sm:block">
                            <div
                                className="grid grid-cols-[3fr,1fr] gap-4 mb-4 border-b py-2 bg-white rounded-md">
                                <div className="flex gap-4 p-2">
                                    <Image src={product.image[0] || '/pizza.png'}
                                           alt={"Img menu item"}
                                           width={250} height={250}
                                           className="w-24 h-24"/>

                                    <div className="grow">
                                        <h3>{product.name}</h3>

                                        <p className="text-gray-400 text-sm mt-1">Код
                                            товара: {product.cod}</p>
                                        {deleteButton &&
                                            <button
                                                type="button"
                                                className="mt-4 p-2 delete flex items-center justify-center gap-1"
                                                onClick={() => removeCartProduct(index)}
                                            >
                                                <MdDeleteForever className="h-6 w-6"/> Видалити
                                            </button>
                                        }
                                    </div>
                                </div>


                                <div className="flex font-semibold items-center justify-end px-5 text-xl">
                                    {product.price} ₴
                                </div>
                            </div>
                        </div>

                        <div className="sm:hidden block">
                            <div key={index}
                                 className="gap-4 mb-4 border-b py-2 bg-white rounded-md">
                                <div className="p-2">
                                    <div className="flex gap-2">
                                        <Image src={product.image[0] || '/pizza.png'}
                                               alt={"Img menu item"}
                                               width={250} height={250}
                                               className="w-24 h-24"/>
                                        <div>
                                            <h3> {product.name}</h3>
                                            <p className="text-gray-400 text-sm mt-1">Код
                                                товара: {product.cod}
                                            </p>
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center">
                                        <div>
                                            {deleteButton && (
                                                <button
                                                    type="button"
                                                    className="mt-4 p-2 delete flex items-center justify-center gap-1"
                                                    onClick={() => removeCartProduct(index)}
                                                >
                                                    <MdDeleteForever className="h-6 w-6"/> Видалити
                                                </button>
                                            )}
                                        </div>

                                        <div
                                            className="flex font-semibold items-center justify-end px-5 text-xl">
                                            {product.price} ₴
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                ))}

            </div>
        </div>
    )
}