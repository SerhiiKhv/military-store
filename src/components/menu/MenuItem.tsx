'use client'

import React, {useContext, useState} from "react";
import {CartContext} from "@/components/AppContext";
import toast from "react-hot-toast";
import MenuItemTitle from "@/components/menu/MenuItemTitle";
import Image from "next/image";

export const MenuItem = (menuItem: any) => {
    const {
        image, name, description,
        price, sizes, ingredients
    } = menuItem.item

    const {addToCart} = useContext(CartContext) as any

    const [showPopUp, setShowPopUp] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedExtras, setSelectedExtras] = useState<any[]>([])
    function handleAddToCartButtonClick() {
        if (!showPopUp) {
            setShowPopUp(true)
            return
        } else {
            addToCart(menuItem, selectedSize, selectedExtras)
            setShowPopUp(false)
            toast.success('Added to cart!')
        }
    }

    function handleExtraThingClick(e: any, extrasThing: any) {
        const checked = e.target.checked;
        if (checked) {
            setSelectedExtras((prev: any[]) => [...prev, extrasThing]);
        } else {
            setSelectedExtras((prev: any[]) => prev.filter((e: any) => e.name !== extrasThing.name));
        }
    }


    let selectedPrice = 0
    if (selectedSize) {
        selectedPrice += selectedSize;
    }

    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price
        }
    }

    return (
        <>
            {showPopUp && (
                <div
                    onClick={() => setShowPopUp(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div
                        onClick={e => e.stopPropagation()}
                        className="bg-white p-4 rounded-lg max-h-screen ">
                        <div className="overflow-y-scroll p-2"
                             style={{maxHeight: 'calc(100vh - 100px)'}}>
                            <Image
                                src={image || '/pizza.png'} alt={name}
                                width={300} height={200}
                                className="mx-auto"/>
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            {sizes?.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map((size: any) => (
                                        <label className="flex items-center p-4 border rounded-md mb-1 gap-2">
                                            <input
                                                type="radio"
                                                onClick={() => setSelectedSize(size.price)}
                                                //checked={selectedSize?.name === size.name}
                                                name="size"/>
                                            {size.name} ${size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {ingredients?.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {ingredients.map((ingredient: any) => (
                                        <label className="flex items-center p-4 border rounded-md mb-1 gap-2">
                                            <input
                                                type="checkbox"
                                                name="size"
                                                onClick={e => handleExtraThingClick(e, ingredient)}/>
                                            {ingredient.name} +${ingredient.price}
                                        </label>
                                    ))}
                                </div>
                            )}

                            <button type="button"
                                    className="bg-primary text-white"
                                    onClick={handleAddToCartButtonClick}>
                                Add to cart {selectedPrice}
                            </button>

                            <button type="button"
                                    className="mt-1"
                                    onClick={() => setShowPopUp(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTitle onAddToCart={handleAddToCartButtonClick} item={menuItem.item}/>
        </>
    )
}