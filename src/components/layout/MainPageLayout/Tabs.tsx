'use client'

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin} : {isAdmin: boolean}){

    const path = usePathname()

    return (
        <div className="flex mx-auto gap-2 tabs justify-center">
            <Link className={path === '/profile' ? "active" : ''}
                  href={'/profile'}>
                Profile
            </Link>

            {isAdmin && (
                <>
                    <Link className={path === '/categories' ? "active" : ''}
                          href={'/categories'}>
                        Categories
                    </Link>

                    <Link className={path.includes('/shop-items') ? "active" : ''}
                          href={'/shop-items'}>
                        Menu Items
                    </Link>

                    <Link className={path.includes('/users') ? "active" : ''}
                          href={'/users'}>
                        Users
                    </Link>
                </>
            )}
        </div>
    )
}