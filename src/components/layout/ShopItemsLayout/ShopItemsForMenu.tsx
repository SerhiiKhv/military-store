import Image from "next/image";
import React, {useContext} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import {CartContext} from "@/components/AppContext";
import toast from "react-hot-toast";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import Link from "next/link";

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
                <Link href={`/shop-item/review/${item._id}`}>
                    <div className="flex flex-col items-center justify-center">
                        <Image src={item.image[0] || '/pizza.png'} alt={"Img shop item"} width={250}
                               height={250}
                               className="rounded-xl mb-1 aspect-square object-cover"/>
                    </div>

                    <span className="">{item.name}</span>

                </Link>

                <div className="flex items-center justify-between">
                    <p className="font-semibold">{item.price} грн.</p>

                    <div>
                        {item.availability ?
                            <button type="button"
                                    className="button"
                                    onClick={handleAddToCartButtonClick}>
                                <ShoppingCartIcon/>
                            </button> :
                            "Немає в наявності"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}