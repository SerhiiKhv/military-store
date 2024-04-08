import React, {useEffect, useState} from "react";
import {ShopItemType} from "@/components/Types/ShopItem";
import toast from "react-hot-toast";
import {useProfile} from "@/components/UseProfile";
import {RiStarSFill, RiStarSLine} from "react-icons/ri";
import {useParams} from "next/navigation";
import {GetShopItemID} from "@/app/ApiRequest/ApiRequest";

export default function ShopItemFormRating({shopItem}: { shopItem: ShopItemType }) {

    const {id} = useParams()
    const {data} = useProfile()

    const [AVGrating, setAVGrating] = useState<number>(0);
    const [newShopItem, setNewShopItem] = useState<ShopItemType>(shopItem);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [rated, setRated] = useState<boolean>(false);
    const [updateRating, setUpdateRating] = useState<boolean>(false)

    useEffect(() => {
        AVGRating()
        checkRated()
    }, [newShopItem, data]);

    useEffect(() => {
        GetShopItemID(setNewShopItem, id)
    }, [updateRating]);

    function checkRated() {
        if (newShopItem.rating && data?._id) {
            const ratedByUser = newShopItem.rating.find(r => r.userId === data._id);
            if (ratedByUser) {
                setRated(true);
            }
        }
    }

    function changeRating(rate: number) {
        setUpdateRating(true)
        if (data?._id) {
            if (rated) {
                const updatedRating = newShopItem.rating.map(rating => {
                    if (rating.userId === data._id) {
                        return {...rating, rate};
                    }
                    return rating;
                });
                setNewShopItem({
                    ...newShopItem,
                    rating: updatedRating
                });
            } else {
                setNewShopItem({
                    ...newShopItem,
                    rating: [
                        ...newShopItem.rating,
                        {
                            userId: data._id,
                            rate
                        }
                    ]
                });
                setRated(true);
            }
        }
        setUpdateRating(false)
    }

    async function onSubmit(e: any, data: ShopItemType) {
        e.preventDefault();
        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/shop-items', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                });

                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        });

        await toast.promise(creatingPromise, {
            loading: 'Приймаємо вашу оцінку...',
            success: 'Дякуємо за оцінку!',
            error: 'Error'
        });
    }

    function AVGRating() {
        if (newShopItem.rating) {
            const totalRate = newShopItem.rating.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0);
            const averageRate = totalRate / newShopItem.rating.length;
            const roundedAverageRate = averageRate.toFixed(1);
            setAVGrating(+roundedAverageRate);
        }
    }

    return (
        <form
            className="flex gap-1 bg-white p-8 rounded-md"
            onSubmit={e => onSubmit(e, newShopItem)}>
            <div className="flex">
                {[1, 2, 3, 4, 5].map((rating, index) => (
                    <button
                        key={index}
                        onClick={() => changeRating(rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}>
                        {AVGrating >= rating || hoveredRating >= rating ? (
                            <RiStarSFill className="h-6 w-6 text-orange-600"/>
                        ) : (
                            <RiStarSLine className="h-6 w-6 hover:text-orange-600"/>
                        )}
                    </button>
                ))}
            </div>
            <h1>{newShopItem.rating.length} відгуків</h1>
        </form>
    )
}
