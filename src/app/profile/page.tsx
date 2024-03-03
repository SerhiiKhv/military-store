'use client'

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import UserProfileForm from "@/components/layout/UserPageLayout/UserProfileForm";
import {UserType} from "@/components/Types/UserType";

export default function ProfilePage() {

    const session = useSession()
    const {status} = session

    const [userData, setUserData] = useState<UserType | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUserData(data)
                    setIsAdmin(data.admin)
                    setProfileFetched(true)

                })
            })
        }
    }, [session, status, userData])

    if (status === 'loading' || !profileFetched) {
        return "Loading..."
    }

    if (status === 'unauthenticated') {
        redirect('/login')
    }

    async function handleProfileInfoUpdate(ev: any,
                                           {name, address, phone, image}
                                               :{name: string, address: string, phone: string, image: string}
    ) {
        ev.preventDefault();

        const savingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'PUT',
                    body: JSON.stringify(
                        {name,address,phone,image}
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
            loading: 'Saving...',
            success: 'Profile save!',
            error: 'Error save'
        })

    }

    return (
        <section className="mx-auto max-w-lg mt-8">
            <UserTabs isAdmin={isAdmin}/>

            <UserProfileForm userData={userData} onSave={handleProfileInfoUpdate}/>
        </section>
    )
}
