'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import {CategoriesType} from "@/components/Types/CategoriesType";
import {SectionHeader} from "@/components/layout/SectionHeader";
import ShopItems from "@/components/layout/ShopItem";

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
                    <div className="flex items-center justify-center p-4">
                        <SectionHeader subHeader={""} mainHeader={"Shop items:"}/>
                    </div>

                    {categories.length > 0 && categories.map((c: CategoriesType) => (
                        <div>
                            <div className="flex items-center justify-center p-4">
                                <SectionHeader subHeader={""} mainHeader={c.name}/>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                {shopItems.filter((item: ShopItemType) => item.category === c._id).map((item: ShopItemType) => (
                                    <ShopItems {...item} key={item._id}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}