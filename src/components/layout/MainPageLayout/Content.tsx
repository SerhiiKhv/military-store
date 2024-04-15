'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {CategoryType} from "@/components/Types/CategoryType";
import {ShopItemType} from "@/components/Types/ShopItem";
import Link from "next/link";
import {GetCategories, GetShopItems} from "@/app/ApiRequest/ApiRequest";
import ShopItemsList from "@/components/layout/ShopItemsLayout/ShopItemsList";
import {useMediaQuery} from "@react-hook/media-query";

export default function Content() {
    const isMediumScreen = useMediaQuery('(min-width: 640px)');

    const [categories, setCategories] = useState([])
    const [shopItems, setShopItems] = useState<[ShopItemType] | []>([])

    useEffect(() => {
        GetCategories(setCategories)
        GetShopItems(setShopItems)
    }, [])

    return (
        <section className="my-container">
            <div className="sm:grid sm:grid-cols-[1fr,4fr]">

                {isMediumScreen &&
                    <div className="">
                        <p className="font-bold text-xl">Категорії</p>

                        {categories?.length > 0 && categories.map((c: CategoryType) => (
                            <div className="px-4 py-1 gap-2 cursor-pointer" key={c._id}>
                                <div className="flex graw justify-between items-center">
                                    <Link href={`/category/` + c._id}>
                                        <span>{c.name}</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                <div className="sm:p-4 p-1">
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
                {categories.length > 0 && categories.map((c: CategoryType) => (
                    <ShopItemsList key={c._id} categoryName={c.name} shopItems={shopItems} id={c._id}/>
                ))}
            </div>
        </section>
    )
}