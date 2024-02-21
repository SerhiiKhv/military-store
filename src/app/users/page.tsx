'use client'

import UserTabs from "@/components/layout/Tabs";
import {useProfile} from "@/components/UseProfile";
import {useEffect, useState} from "react";
import {UserType} from "@/components/Types/UserType";
import Link from "next/link";

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
            Users:

            {users?.length > 0 && users.map((user: UserType) => (
                <div className='flex bg-gray-300 rounded-xl mb-2 p-4 justify-between'>
                    <div className='gap-2'>
                        <span className="italic">{user.name || 'No name'} </span>
                        <span>{user.email}</span>
                    </div>
                    <div className="bg-white rounded-xl">
                        <Link className="button" href={'/users/' + user._id}>Edit</Link>
                    </div>
                </div>
            ))}
        </section>
    )
}