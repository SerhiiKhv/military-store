'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import Image from "next/image";
import {CategoriesType} from "@/components/Types/CategoriesType";
import {SectionHeader} from "@/components/layout/SectionHeader";

export default function ShopItemsPage() {

    const {loading, data} = useProfile();

    const [shopItems, setShopItems] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchshopItems()

        fetch("/api/categories").then(res => {
            res.json().then(categories => setCategories(categories))
        })
    }, [])

    function fetchshopItems() {
        fetch('/api/shop-items').then(res => {
            res.json().then(shopItem => {
                setShopItems(shopItem)
            })
        })
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    return (
        <section className="p-4 mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="pt-5 flex flex-col items-center justify-center">
                <div className="max-w-md text-center">
                    <Link href={'/shop-items/new'}
                          className="button">
                        Create new shop item
                    </Link>
                </div>

                <div>
                    <h2 className="text-gray-500">Shop items: </h2>

                    {categories.length > 0 && categories.map((c: CategoriesType) => (
                        <div>
                            <div className="text-center">
                                <SectionHeader subHeader={""} mainHeader={c.name}/>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                {shopItems.filter((item: ShopItemType) => item.category === c._id).map((c: ShopItemType) => (
                                    <div
                                        className="bg-gray-200 rounded-xl px-4 py-2 gap-2 cursor-pointer mb-2 text-center"
                                        key={c._id}>

                                        <Link href={`/shop-items/edit/${c._id}`}>
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src={c.image || '/pizza.png'} alt={"Img shop item"} width={250}
                                                       height={250}
                                                       className="rounded-xl mb-1 aspect-square object-cover"/>
                                            </div>
                                            <span className="font-semibold">{c.name}</span>
                                            <p className="text-gray-500 text-sm">{c.description}</p>
                                            <p className="text-gray-500">{c.price}$</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}