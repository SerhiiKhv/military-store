'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import toast from "react-hot-toast";
import ShopItemForm from "@/components/layout/ShopItemsLayout/ShopItemForm";
import {ShopItemType} from "@/components/Types/ShopItem";

export default function NewMenuItemsPage() {

    const {loading, data} = useProfile();

    async function handleFormSubmit(e: any, data: ShopItemType) {
        e.preventDefault()

        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/shop-items', {
                    method: 'POST',
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

            <ShopItemForm onSubmit={handleFormSubmit} shopItem={null}/>
        </section>
    )
}