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

    const filteredShopItems = shopItems.filter((item: ShopItemType) => item.category === id);
    const hasItems = filteredShopItems.length > 0;

    return (
        <div>
            {hasItems && (
                <>
                    <p className="sm:text-2xl text-xl font-bold">{categoryName}</p>

                    <div className="grid sm:grid-cols-6 grid-cols-2 gap-2">
                        {filteredShopItems
                            .slice(0, 5)
                            .map((item: ShopItemType) => (
                                <ShopItemsForMenu {...item} key={item._id}/>
                            ))}
                    </div>
                </>
            )}
        </div>
    )
}
