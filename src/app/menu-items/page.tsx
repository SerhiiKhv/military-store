'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {MenuItemType} from "@/components/Types/MenuItem";
import Image from "next/image";
import {CategoriesType} from "@/components/Types/CategoriesType";
import {SectionHeader} from "@/components/layout/SectionHeader";
import {MenuItem} from "@/components/menu/MenuItem";

export default function MenuItemsPage() {

    const {loading, data} = useProfile();

    const [menuItems, setMenuItems] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchMenuItems()

        fetch("/api/categories").then(res => {
            res.json().then(categories => setCategories(categories))
        })
    }, [])

    function fetchMenuItems() {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItem => {
                setMenuItems(menuItem)
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
                    <Link href={'/menu-items/new'}
                          className="button">
                        Create new menu item
                    </Link>
                </div>

                <div>
                    <h2 className="text-gray-500">Menu items: </h2>

                    {categories.length > 0 && categories.map((c: CategoriesType) => (
                        <div>
                            <div className="text-center">
                                <SectionHeader subHeader={""} mainHeader={c.name}/>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                {menuItems.filter((item: MenuItemType) => item.category === c._id).map((c: MenuItemType) => (
                                    <div
                                        className="bg-gray-200 rounded-xl px-4 py-2 gap-2 cursor-pointer mb-2 text-center"
                                        key={c._id}>

                                        <Link href={`/menu-items/edit/${c._id}`}>
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src={c.image || '/pizza.png'} alt={"Img menu item"} width={250}
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