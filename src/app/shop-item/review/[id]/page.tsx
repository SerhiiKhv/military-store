'use client'

import {useParams} from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import {CharacteristicsType, ShopItemType} from "@/components/Types/ShopItem";
import {CategoryType} from "@/components/Types/CategoryType";
import {HomeIcon} from "@/components/icons/HomeIcon";
import Image from "next/image";
import {StarsIcon} from "@/components/icons/StarsIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import {CartContext} from "@/components/AppContext";
import toast from "react-hot-toast";
import {VscChevronLeft, VscChevronRight} from "react-icons/vsc";
import {GetCategories, GetShopItemID} from "@/app/ApiRequest/ApiRequest";
import ShopItemFormRating from "@/components/layout/ShopItemsLayout/ShopItemFormRating";

export default function ReviewShopItemPageID() {

    const {id} = useParams()
    const {addToCart} = useContext(CartContext) as any

    const [shopItems, setShopItems] = useState<ShopItemType>()
    const [categories, setCategories] = useState<CategoryType[]>()
    const [categoryName, setCategoryName] = useState('')
    const [photoIndex, setPhotoIndex] = useState(0);
    const [numInputs, setNumInputs] = useState(shopItems?.image?.length || 0);

    function handleAddToCartButtonClick() {
        addToCart(shopItems)
        toast.success('Added to cart!')
    }

    useEffect(() => {
        GetShopItemID(setShopItems, id);
    }, [id]);

    useEffect(() => {
        checkCategory();
        setNumInputs(shopItems?.image?.length || 0);
    }, [categories, checkCategory, shopItems?.image?.length]);

    function checkCategory() {
        if (categories && shopItems) {
            categories.map((category: CategoryType) => {
                if (category._id === shopItems?.category) {
                    setCategoryName(category.name)
                }
            })
        }
    }


    return (
        <section className="bg-gray-100">
            <div className="my-container">
                {shopItems && (
                    <div>
                        <div className="flex items-center gap-1 py-6">
                            <HomeIcon/>
                            {categoryName}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="relative">
                                    <button
                                        className="buttonWithoutP flex gap-1 absolute bg-gray-200 rounded-2xl px-2 py-4
                            bottom-1/2 left-2"
                                        type="button"
                                        onClick={() => setPhotoIndex(photoIndex > 0 ? photoIndex - 1 : shopItems.image.length - 1)}>
                                        <VscChevronLeft/>
                                    </button>

                                    <Image src={shopItems?.image[photoIndex] || '/pizza.png'} alt={"avatar"}
                                           width={1000}
                                           height={1000}
                                           className="rounded-xl w-full h-full mb-1 aspect-square object-cover"/>

                                    <button
                                        className="buttonWithoutP flex gap-1 absolute bg-gray-200 rounded-2xl px-2 py-4
                            bottom-1/2 right-2"
                                        type="button"
                                        onClick={() => setPhotoIndex(photoIndex < shopItems.image.length - 1 ? photoIndex + 1 : 0)}>
                                        <VscChevronRight/>
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    {[...Array(numInputs)].map((_, index) => (
                                        <div
                                            onClick={() => setPhotoIndex(index)}>
                                            <Image src={shopItems.image[index] || '/pizza.png'} alt={"avatar"}
                                                   width={50}
                                                   height={50}
                                                   className={`rounded-xl w-full h-full mb-1 aspect-square object-cover ${index !== photoIndex ? "" : "border border-neonNazar"}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h1 className="font-semibold text-3xl pb-4 bg-white p-8 rounded-md">
                                    {shopItems?.name}
                                </h1>

                                <ShopItemFormRating shopItem={shopItems}/>

                                <div className="flex items-center gap-2 bg-white p-8 rounded-md">
                                    <h1 className="text-2xl font-semibold">{shopItems?.price} ₴</h1>

                                    <button type="button"
                                            className="button flex items-center justify-center gap-2"
                                            onClick={handleAddToCartButtonClick}>
                                        <ShoppingCartIcon/> Купити
                                    </button>
                                </div>

                                <div className="bg-white p-8 rounded-md space-y-2">
                                    <h1 className="font-semibold text-xl">Доставка</h1>

                                    <div className="grid grid-cols-3 space-y-2">
                                        <div className="flex items-center gap-2 ">
                                            <Image src={"/NewPost.png"} alt={"NewPost"} width={25} height={25}/>
                                            <p>До відділення нової пошти</p>
                                        </div>

                                        <div className="flex justify-end">
                                            <p className="font-semibold">Відправимо сьогодні</p>
                                        </div>

                                        <div className="flex justify-end">
                                            <p>60+₴</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Image src={"/NewPost.png"} alt={"NewPost"} width={25} height={25}/>
                                            <p>Кур'єром нової пошти</p>
                                        </div>

                                        <div className="flex justify-end">
                                            <p className="font-semibold">Відправимо сьогодні</p>
                                        </div>

                                        <div className="flex justify-end">
                                            <p>100+₴</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-white p-4">
                                    {shopItems.characteristics && (
                                        <div>
                                            <h1 className="text-2xl font-semibold">Основні характеристики</h1>
                                            <div className="h-[300px] overflow-auto px-4">
                                                {shopItems.characteristics.map((characteristic: CharacteristicsType, index: number) => (
                                                    <div key={index}
                                                         className={`flex justify-between border-b ${index % 2 ? "bg-blue-100" : ""}`}>
                                                        <h1>{characteristic.nameCharacteristics}</h1>
                                                        <h1>{characteristic.valueCharacteristics}</h1>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="py-6">
                            <p className="text-xl space-y-2">
                                {shopItems?.description.map((text, index) => (
                                    <div key={index}>
                                        {text}
                                    </div>
                                ))}

                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}