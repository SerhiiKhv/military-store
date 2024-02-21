'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";
import {MenuItemType} from "@/components/Types/MenuItem";

export default function NewMenuItemsPage() {

    const {loading, data} = useProfile();

    async function handleFormSubmit(e: any, data: MenuItemType) {
        e.preventDefault()

        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/menu-items', {
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

            <MenuItemForm onSubmit={handleFormSubmit} menuItem={null}/>
        </section>
    )
}