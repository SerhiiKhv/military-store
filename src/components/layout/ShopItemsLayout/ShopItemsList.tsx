import {ShopItemType} from "@/components/Types/ShopItem";
import ShopItemsForMenu from "@/components/layout/ShopItemsLayout/ShopItemsForMenu";
import React from "react";

export default function ShopItemsList(
    {categoryName, shopItems, id}:
        {
            categoryName: string | '',
            shopItems: [ShopItemType] | [],
            id: string
        }){

    return (
        <div>
            <p className="text-2xl font-bold">{categoryName}</p>

            <div className="grid grid-cols-5 gap-2">
                {shopItems
                    .filter((item: ShopItemType) => item.category === id)
                    .slice(0, 5)
                    .map((item: ShopItemType) => (
                        <ShopItemsForMenu {...item} key={item._id}/>
                    ))}
            </div>
        </div>
    )
}