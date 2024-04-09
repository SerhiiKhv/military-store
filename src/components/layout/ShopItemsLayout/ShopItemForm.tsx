import React, {useEffect, useState} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import {CategoryType} from "@/components/Types/CategoryType";
import AddedImagePhotoLinkList from "@/components/layout/PhotoLayout/AddedImagePhotoLinkList";
import ShopItemModelAddedElement from "@/components/layout/ShopItemsLayout/ShopItemModelAddedElement";
import AddedDescription from "@/components/layout/ShopItemsLayout/AddedDescription";

export default function ShopItemForm({onSubmit, shopItem}: { onSubmit: any, shopItem: ShopItemType | null }) {

    const [_id, setId] = useState(shopItem?._id || "")
    const [name, setName] = useState(shopItem?.name || "")
    const [description, setDescription] = useState(shopItem?.description || [''])
    const [price, setPrice] = useState(shopItem?.price || 0)
    const [image, setImage] = useState(shopItem?.image || [''])
    const [category, setCategory] = useState(shopItem?.category || "Pizza");
    const [categories, setCategories] = useState([]);
    const [availability, setAvailability] = useState<boolean>(shopItem?.availability || false);
    const [cod, setCod] = useState(shopItem?.cod || 0);
    const [characteristics, setCharacteristics] = useState(shopItem?.characteristics || []);

    const [photoLink, setPhotoLink] = useState(shopItem?.image[0] || '')
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setName(shopItem?.name || "")
        setDescription(shopItem?.description || [''])
        setPrice(shopItem?.price || 0)
        setImage(shopItem?.image || [''])
        setId(shopItem?._id || "")
        setCategory(shopItem?.category || "Pizza")
        setPhotoLink(shopItem?.image[0] || "")
        setAvailability(shopItem?.availability || false)
        setCod(shopItem?.cod || 0)
        setCharacteristics(shopItem?.characteristics || [])
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
                  {_id, name, description, price, image, category, availability, cod, characteristics}
              )}
        >
            <div className="grid grid-cols-[1fr,1fr,1fr] gap-2">

                <AddedImagePhotoLinkList photoLink={photoLink} image={image}
                                         setIsFormValid={setIsFormValid} setImage={setImage}/>

                <div className="flex gap-2">
                    <div className="grow">
                        <label>Shop item name </label>
                        <input type="text" value={name}
                               onChange={(e) => setName(e.target.value)}/>

                        <label>Price </label>
                        <input type="number" value={price}
                               onChange={(e) => setPrice(+e.target.value)}/>

                        <label>Description</label>
                        <AddedDescription description={description} setDescription={setDescription}/>

                        <label>Category</label>
                        <select value={category}
                                onChange={e => setCategory(e.target.value)}>
                            {categories?.length > 0 && categories.map((c: CategoryType) => (
                                <option value={c._id}>{c.name}</option>
                            ))}
                        </select>

                        <div className="flex items-center justify-center">
                            <button type="submit"
                                    className="button mt-2 max-w-lg w-full"
                                    disabled={isFormValid}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label>Cod product: </label>
                    <input type="number" value={cod}
                           onChange={(e) => setCod(+e.target.value)}/>

                    <div className="flex justify-ceneter gap-2">
                        <h1>Availability: </h1>
                        <input type="radio"
                               value="courier" checked={availability}
                               onClick={() => setAvailability(!availability)}/>
                    </div>


                    <ShopItemModelAddedElement name={'Characteristics'}
                                               props={characteristics}
                                               setProps={setCharacteristics}
                                               buttonName={'Add item characteristic'}/>
                </div>
            </div>
        </form>
    )
}