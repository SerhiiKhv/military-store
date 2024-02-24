'use client'

import UserTabs from "@/components/layout/Tabs";
import {useProfile} from "@/components/UseProfile";
import React, {useEffect, useState} from "react";
import {UserType} from "@/components/Types/UserType";
import Link from "next/link";
import {SectionHeader} from "@/components/layout/SectionHeader";

export default function Users() {

    const {loading, data} = useProfile();

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
                setUsers(users)
            })
        })
    }, []);


    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    return (
        <section>
            <UserTabs isAdmin={true}/>

            <div className="flex items-center justify-center p-4">
                <SectionHeader subHeader={""} mainHeader={"Users:"}/>
            </div>

            <div className="grid grid-cols-3 gap-2 px-4">
                {users?.length > 0 && users.map((user: UserType) => (
                    <div className='flex bg-gray-300 rounded-xl mb-2 p-4 justify-between'>
                        <div>
                            <span>{user.email}</span>
                            <span className="italic">
                                {
                                    user.name.length > 20 ?
                                        user.name.slice(0, 20) + '...'
                                        :
                                        user.name
                                        || 'No name'
                                }
                            </span>
                        </div>
                        <div className="bg-white rounded-xl">
                            <Link className="button" href={'/users/' + user._id}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}