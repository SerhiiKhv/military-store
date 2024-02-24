'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import ShopItemForm from "@/components/layout/ShopItemForm";
import {ShopItemType} from "@/components/Types/ShopItem";

export default function EditMenuItemsPage() {

    const {id} = useParams()
    const {loading, data} = useProfile();

    const [menuItems, setMenuItems] = useState(null)
    const [saveChange, setSaveChange] = useState(false)

    useEffect(() => {
        fetch('/api/shop-items').then(res => {
            res.json().then(items => {
                const item = items.find((i: any) => i._id === id)
                setMenuItems(item)
            })
        })
    }, [saveChange]);

    async function handleFormSubmit(e: any, data: ShopItemType) {
        e.preventDefault()
        setSaveChange(true)
        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/shop-items', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                })

                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
            setSaveChange(false)
        })

        await toast.promise(creatingPromise, {
            loading: 'Creating new item',
            success: 'Item created!',
            error: 'Error'
        })
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    return (
        <section>
            <UserTabs isAdmin={true}/>

            <ShopItemForm onSubmit={handleFormSubmit} shopItem={menuItems}/>
        </section>
    )
}