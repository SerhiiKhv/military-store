'use client'

import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {GetCategoryId, GetShopItems} from "@/app/ApiRequest/ApiRequest";
import {ShopItemType} from "@/components/Types/ShopItem";
import ShopItemsForMenu from "@/components/layout/ShopItemsLayout/ShopItemsForMenu";
import {CategoryType} from "@/components/Types/CategoryType";
import ShopItemsList from "@/components/layout/ShopItemsLayout/ShopItemsList";

export default function CategoryNamePage(){

    const {id} = useParams()
    const [category, setCategory] = useState()
    const [shopItems, setShopItems] = useState<[ShopItemType] | []>([])

    useEffect(() => {
        GetCategoryId(setCategory, id)
        GetShopItems(setShopItems)
    }, [])

    return(
        <section className="my-container">
            <ShopItemsList categoryName={category?.name} shopItems={shopItems} id={String(id)}/>

            <p className="text-2xl font-bold">{category?.name}</p>

            <div className="grid grid-cols-5 gap-2">
                {shopItems
                    .filter((item: ShopItemType) => item.category === id)
                    .slice(0, 5)
                    .map((item: ShopItemType) => (
                        <ShopItemsForMenu {...item} key={item._id}/>
                    ))}
            </div>
        </section>
    )
}