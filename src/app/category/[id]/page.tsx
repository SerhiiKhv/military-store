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
    const [category, setCategory] = useState<CategoryType>()
    const [shopItems, setShopItems] = useState<[ShopItemType] | []>([])

    useEffect(() => {
        GetCategoryId(setCategory, id); // Додано 'id' до масиву залежностей
    }, [id]); // Додано 'id' до масиву залежностей

    useEffect(() => {
        GetShopItems(setShopItems); // Додано 'setShopItems' до масиву залежностей
    }, [setShopItems]); // Додано 'setShopItems' до масиву залежностей


    return(
        <section className="my-container">
            <ShopItemsList categoryName={category?.name || ''} shopItems={shopItems} id={String(id)}/>
        </section>
    )
}