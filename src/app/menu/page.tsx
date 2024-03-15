'use client'

import {useEffect, useState} from "react";
import {SectionHeader} from "@/components/layout/DopLayout/SectionHeader";
import {CategoryType} from "@/components/Types/CategoryType";
import {ShopItemType} from "@/components/Types/ShopItem";
import {MenuItem} from "@/components/menu/MenuItem";

export default function MenuPage() {

    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch("/api/categories").then(res => {
            res.json().then(categories => setCategories(categories))
        })
        fetch("/api/menu-items").then(res => {
            res.json().then(menuItems => setMenuItems(menuItems))
        })
    }, []);

    return (
        <section>
            <div className="">
                {categories.length > 0 && categories.map((c: CategoryType) => (
                    <div>
                        <div className="text-center">
                            <SectionHeader subHeader={""} mainHeader={c.name}/>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-12 mt-8">
                            {menuItems.filter((item: ShopItemType) => item.category === c._id).map((item: ShopItemType) => (
                                <div>
                                    <MenuItem item={item}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}