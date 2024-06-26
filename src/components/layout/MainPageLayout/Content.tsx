'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {CategoryType} from "@/components/Types/CategoryType";
import {ShopItemType} from "@/components/Types/ShopItem";
import Link from "next/link";
import {GetCategories, GetShopItems} from "@/app/ApiRequest/ApiRequest";
import ShopItemsList from "@/components/layout/ShopItemsLayout/ShopItemsList";

export default function Content() {

    const [categories, setCategories] = useState([])
    const [shopItems, setShopItems] = useState<[ShopItemType] | []>([])

    useEffect(() => {
        GetCategories(setCategories)
        GetShopItems(setShopItems)
    }, [])

    return (
        <section className="my-container">
            <div className="sm:grid sm:grid-cols-[1fr,4fr]">

                <div className="hidden sm:block">
                    <p className="font-bold text-xl">Категорії</p>

                    {categories?.length > 0? categories.map((c: CategoryType) => (
                        <div className="px-4 py-1 gap-2 cursor-pointer" key={c._id}>
                            <div className="flex graw justify-between items-center">
                                <Link href={`/category/` + c._id}>
                                    <span>{c.name}</span>
                                </Link>
                            </div>
                        </div>
                    )) :
                        <Image
                        src={'/loadingGif.gif'}
                        alt={"Img loadingGif"}
                        width={250}
                        height={250}
                    />}
                </div>

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
                {categories.length > 0? categories.map((c: CategoryType) => (
                    <ShopItemsList key={c._id} categoryName={c.name} shopItems={shopItems} id={c._id}/>
                )) :
                    <div className="flex items-center justify-center">
                        <Image
                            src={'/loadingGif.gif'}
                            alt={"Img loadingGif"}
                            width={250}
                            height={250}
                        />
                    </div>
                   }
            </div>
        </section>
    )
}