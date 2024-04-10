'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import {CategoryType} from "@/components/Types/CategoryType";
import {SectionHeader} from "@/components/layout/DopLayout/SectionHeader";
import ShopItemsForAdmin from "@/components/layout/ShopItemsLayout/ShopItemForAdmin";

export default function ShopItemsPage() {

    const {loading, data} = useProfile();

    const [shopItems, setShopItems] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchShopItems()

        fetch("/api/categories").then(res => {
            res.json().then(categories => setCategories(categories))
        })
    }, [])

    function fetchShopItems() {
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
        <section className="px-4 mx-auto">
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

                    {categories.length > 0 && categories.map((c: CategoryType) => (
                        <div key={c._id}>
                            <div className="flex items-center justify-center p-4">
                                <SectionHeader subHeader={""} mainHeader={c.name}/>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                {shopItems.filter((item: ShopItemType) => item.category === c._id).map((item: ShopItemType) => (
                                    <ShopItemsForAdmin {...item} key={item._id}/>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}