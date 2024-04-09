import Link from "next/link";
import Image from "next/image";
import React from "react";
import {ShopItemType} from "@/components/Types/ShopItem";

export default function ShopItemsForAdmin(item: ShopItemType) {

    return (
        <div
            className="bg-gray-200 rounded-xl px-4 py-2 gap-2 cursor-pointer mb-2 text-center"
            key={item._id}>

            <Link href={`/shop-items/edit/${item._id}`}>
                <div className="flex flex-col items-center justify-center">
                    <Image src={item.image[0] || '/pizza.png'} alt={"Img shop item"} width={250}
                           height={250}
                           className="rounded-xl mb-1 aspect-square object-cover"/>
                </div>
                <span className="font-semibold">{item.name}</span>

                <p className="font-semibold">{item.price} грн.</p>
                <p>{item.availability? "Є в наявності" : "Немає в наявності"}</p>
            </Link>
        </div>
    )
}