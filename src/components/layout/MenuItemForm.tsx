import React, {useEffect, useState} from "react";
import {ExtraPriceType, MenuItemType} from "@/components/Types/MenuItem";
import MenuItemsPriceProps from "@/components/layout/MenuItemsPriceProps";
import {CategoriesType} from "@/components/Types/CategoriesType";
import Image from "next/image";
import AddedImageViaLink from "@/components/layout/AddedImageViaLink";

export default function MenuItemForm({onSubmit, menuItem}: { onSubmit: any, menuItem: MenuItemType | null }) {

    const [_id, setId] = useState(menuItem?._id || "")
    const [name, setName] = useState(menuItem?.name || "")
    const [description, setDescription] = useState(menuItem?.description || "")
    const [price, setPrice] = useState(menuItem?.price || "")
    const [image, setImage] = useState(menuItem?.image || "")
    const [sizes, setSizes] = useState<ExtraPriceType[]>(menuItem?.sizes || []);
    const [ingredients, setIngredients] = useState<ExtraPriceType[]>(menuItem?.ingredients || []);
    const [category, setCategory] = useState(menuItem?.category || "Pizza");
    const [categories, setCategories] = useState([]);

    const [photoLink, setPhotoLink] = useState(menuItem?.image || '')
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setName(menuItem?.name || "")
        setDescription(menuItem?.description || "")
        setPrice(menuItem?.price || "")
        setImage(menuItem?.image || "")
        setId(menuItem?._id || "")
        setSizes(menuItem?.sizes || [])
        setIngredients(menuItem?.ingredients || [])
        setCategory(menuItem?.category || "Pizza")
        setPhotoLink(menuItem?.image || "")
    }, [menuItem]);

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
                  {_id, name, description, price, image: photoLink, sizes, ingredients, category}
              )}
        >
            <div className="grid grid-cols-[1fr,1fr,1fr] gap-2">

                <AddedImageViaLink photoLink={photoLink} setPhotoLink={setPhotoLink}
                                   image={image} setIsFormValid={setIsFormValid}/>

                <div className="flex gap-2">
                    <div className="grow">
                        <label>Menu item name </label>
                        <input type="text" value={name}
                               onChange={(e) => setName(e.target.value)}/>

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

                <div className="grid grid-rows-2">
                    <MenuItemsPriceProps name={'Sizes'}
                                         props={sizes}
                                         setProps={setSizes}
                                         buttonName={'Add item size'}/>

                    <MenuItemsPriceProps name={'Extra ingredients'}
                                         props={ingredients}
                                         setProps={setIngredients}
                                         buttonName={'Add ingredients prices'}/>
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