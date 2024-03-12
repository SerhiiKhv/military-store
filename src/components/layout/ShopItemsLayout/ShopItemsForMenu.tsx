import Image from "next/image";
import React, {useContext} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import {CartContext} from "@/components/AppContext";
import toast from "react-hot-toast";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";

export default function ShopItemsForMenu(item: ShopItemType) {

    const {addToCart} = useContext(CartContext) as any

    function handleAddToCartButtonClick() {
            addToCart(item)
            toast.success('Added to cart!')
    }

    return (
        <div
            className="border rounded-2xl px-4 py-2 gap-2 cursor-pointer mb-2"
            key={item._id}>

            <div>
                <div className="flex flex-col items-center justify-center">
                    <Image src={item.image || '/pizza.png'} alt={"Img shop item"} width={250}
                           height={250}
                           className="rounded-xl mb-1 aspect-square object-cover"/>
                </div>

                <span className="">{item.name}</span>

                <div className="flex items-center justify-between">
                    <p className="font-semibold">{item.price} грн.</p>

                    <button type="button"
                            className="button"
                            onClick={handleAddToCartButtonClick}>
                        <ShoppingCartIcon/>
                    </button>
                </div>
            </div>
        </div>
    )
}