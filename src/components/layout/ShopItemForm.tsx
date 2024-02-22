import React, {useEffect, useState} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import {CategoriesType} from "@/components/Types/CategoriesType";
import AddedImageViaLink from "@/components/layout/AddedImageViaLink";

export default function ShopItemForm({onSubmit, shopItem}: { onSubmit: any, shopItem: ShopItemType | null }) {

    const [_id, setId] = useState(shopItem?._id || "")
    const [name, setName] = useState(shopItem?.name || "")
    const [description, setDescription] = useState(shopItem?.description || "")
    const [price, setPrice] = useState(shopItem?.price || 0)
    const [image, setImage] = useState(shopItem?.image || "")
    const [category, setCategory] = useState(shopItem?.category || "Pizza");
    const [categories, setCategories] = useState([]);

    const [photoLink, setPhotoLink] = useState(shopItem?.image || '')
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setName(shopItem?.name || "")
        setDescription(shopItem?.description || "")
        setPrice(shopItem?.price || 0)
        setImage(shopItem?.image || "")
        setId(shopItem?._id || "")
        setCategory(shopItem?.category || "Pizza")
        setPhotoLink(shopItem?.image || "")
    }, [shopItem]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }, []);


    return (
        <form className="p-4 mx-auto"
              onSubmit={e => onSubmit(e,
                  {_id, name, description, price, image: photoLink, category}
              )}
        >
            <div className="grid grid-cols-[1fr,1fr,1fr] gap-2">

                <AddedImageViaLink photoLink={photoLink} setPhotoLink={setPhotoLink}
                                   image={image} setIsFormValid={setIsFormValid}/>

                <div className="flex gap-2">
                    <div className="grow">
                        <label>Shop item name </label>
                        <input type="text" value={name}
                               onChange={(e) => setName(e.target.value)}/>

                        <label>Price </label>
                        <input type="number" value={price}
                               onChange={(e) => setPrice(+e.target.value)}/>

                        <label>Description</label>
                        <textarea
                            className="w-full h-96 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label>Category</label>
                        <select value={category}
                                onChange={e => setCategory(e.target.value)}>
                            {categories?.length > 0 && categories.map((c: CategoriesType) => (
                                <option value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <button type="submit"
                        className="mt-2 max-w-lg"
                        disabled={isFormValid}>
                    Save
                </button>
            </div>

        </form>
    )
}