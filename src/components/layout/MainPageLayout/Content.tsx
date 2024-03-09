'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {CategoriesType} from "@/components/Types/CategoriesType";
import {ShopItemType} from "@/components/Types/ShopItem";
import ShopItemsForMenu from "@/components/layout/ShopItemsLayout/ShopItemsForMenu";

export default function Content() {

    const [categories, setCategories] = useState([])
    const [shopItems, setShopItems] = useState([])

    useEffect(() => {
        fetchCategories()
        fetchShopItems()
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    function fetchShopItems() {
        fetch('/api/shop-items').then(res => {
            res.json().then(shopItem => {
                setShopItems(shopItem)
            })
        })
    }

    return (
        <section className="my-container">
            <div className="grid grid-cols-[1fr,4fr]">
                <div className="">
                    <p className="font-bold text-xl">Категорії</p>

                    {categories?.length > 0 && categories.map((c: CategoriesType) => (
                        <div className="px-4 py-1 gap-2 cursor-pointer">
                            <div className="flex graw justify-between items-center">
                                <span key={c._id}>{c.name}</span>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="p-4">
                    <Image
                        src={'/monobank.webp'}
                        alt={"Img telegram"}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        width={1050}
                        height={490}
                    />
                    </div>
            </div>

            <div>
                <p className="text-4xl font-bold">Товари</p>

                {categories.length > 0 && categories.map((c: CategoriesType) => (
                    <div>
                        <p className="text-2xl font-bold">{c.name}</p>

                        <div className="grid grid-cols-5 gap-2">
                            {shopItems
                                .filter((item: ShopItemType) => item.category === c._id)
                                .slice(0,5)
                                .map((item: ShopItemType) => (
                                    <ShopItemsForMenu {...item} key={item._id}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}