'use client'

import {useParams} from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import {CategoriesType} from "@/components/Types/CategoriesType";
import {HomeIcon} from "@/components/icons/HomeIcon";
import Image from "next/image";
import {StarsIcon} from "@/components/icons/StarsIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import {CartContext} from "@/components/AppContext";
import toast from "react-hot-toast";

export default function ReviewShopItemPageID() {

    const {id} = useParams()
    const {addToCart} = useContext(CartContext) as any

    const [shopItems, setShopItems] = useState<ShopItemType>()
    const [categories, setCategories] = useState<CategoriesType[]>()
    const [categoryName, setCategoryName] = useState('')

    function handleAddToCartButtonClick() {
            addToCart(shopItems)
            toast.success('Added to cart!')
    }

    useEffect(() => {
        fetch('/api/shop-items').then(res => {
            res.json().then(items => {
                const item = items.find((i: any) => i._id === id)
                setShopItems(item)
            })
        })

        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }, []);

    useEffect(() => {
        checkCategory()
    }, [shopItems, categories]);


    function checkCategory() {
        if (categories && shopItems) {
            categories.map((category: CategoriesType) => {
                if (category._id === shopItems?.category) {
                    setCategoryName(category.name)
                }
            })
        }
    }


    return (
        <section className="bg-gray-100">
            <div className="my-container">
                <div className="flex items-center gap-1 py-6">
                    <HomeIcon/>
                    {categoryName}
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-md flex items-center justify-center">
                        <Image src={shopItems?.image || '/pizza.png'} alt={"Img shop item"} width={700}
                               height={700}
                               className="rounded-xl mb-1 aspect-square object-cover m-4"/>
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-3xl pb-4 bg-white p-8 rounded-md">
                            {shopItems?.name}
                        </h1>

                        <div className="flex gap-1 bg-white p-8 rounded-md">
                            <div className="flex">
                                <StarsIcon/>
                                <StarsIcon/>
                                <StarsIcon/>
                                <StarsIcon/>
                                <StarsIcon/>
                            </div>


                            <h1>0 відгуків</h1>
                        </div>

                        <div className="flex items-center gap-2 bg-white p-8 rounded-md">
                            <h1 className="text-2xl font-semibold">{shopItems?.price} ₴</h1>

                            <button type="button"
                                    className="button flex items-center justify-center gap-2"
                                    onClick={handleAddToCartButtonClick}>
                                <ShoppingCartIcon/> Купити
                            </button>
                        </div>
                    </div>
                </div>

                <div className="py-6">
                    <p className="text-xl">{shopItems?.description}</p>
                </div>
            </div>
        </section>
    )
}