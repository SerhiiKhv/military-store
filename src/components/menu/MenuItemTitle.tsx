import Image from "next/image";
import React from "react";
import {MenuItemType} from "@/components/Types/MenuItem";

export default function MenuItemTitle({onAddToCart, item} : {onAddToCart: any, item: MenuItemType}) {

    const {image, name, description,
        price, sizes, ingredients} = item

    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center
        group hover:bg-white hover:shadow-2xl hover:shadow-black/50
        transition-alt mx-auto ">
            <div>
                <Image src={image || '/pizza.png'}
                       alt={"Img menu item"}
                       width={250} height={250}
                       className="max-h-auto block mb-1 mx-auto"/>
            </div>

            <div>
                <h4 className="font-semibold text-xl my-2">
                    {name}
                </h4>

                <p className="text-gray-500 text-sm">
                    {description}
                </p>
            </div>

            <div>
                <button
                    type="button"
                    onClick={onAddToCart}
                    className="mt-4 bg-primary text-white rounded-full px-4 py-3">
                    Add to cart {price}$
                </button>
            </div>
        </div>
    )
}