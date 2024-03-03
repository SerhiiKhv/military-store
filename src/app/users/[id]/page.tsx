'use client'

import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import {useProfile} from "@/components/UseProfile";
import UserProfileForm from "@/components/layout/UserPageLayout/UserProfileForm";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {UserType} from "@/components/Types/UserType";

export default function EditUserPage() {

    const {loading, data} = useProfile();
    const {id} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(res => {
            console.log(id)
            res.json().then(user => {
                setUser(user)
            })
        })
    }, []);

    async function handleSaveButtonClick(e: any, data: UserType) {
        e.preventDefault();

        const savingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'PUT',
                    body: JSON.stringify(
                        {...data, _id: id}
                    ),
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

        await toast.promise(savingPromise, {
            loading: 'Editing...',
            success: 'User edit!',
            error: 'Error edit'
        })

    }


    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }



    return (
        <section className="mx-auto max-w-md mt-8">
            <UserTabs isAdmin={true}/>
            <UserProfileForm userData={user} onSave={handleSaveButtonClick} />
        </section>
    )
}