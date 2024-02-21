'use client'

import Image from "next/image"
import {MenuItem} from "@/components/menu/MenuItem";
import {SectionHeader} from "@/components/layout/SectionHeader";
import {useEffect, useState} from "react";

export const HomeMenu = () => {

    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch("/api/menu-items").then(res => {
            res.json().then(i => {
                setMenuItems(i.slice(-3))
            })
        })
    }, []);

    return (
        <section className="py-8">
            <div className="absolute right-0 left-0">
                <div className="h-48 w-48 -top-[70px] -z-10 absolute right-0">
                    <Image src={'/sallad.png'} alt={"sallad"} layout={'fill'} objectFit={'contain'}/>
                </div>

                <div className="h-48 w-48 -top-[100px] -z-10 absolute left-0 transform scale-x-[-1]">
                    <Image src={'/sallad.png'} alt={"sallad"} layout={'fill'} objectFit={'contain'}/>
                </div>

            </div>
            <div className="text-center">
                <SectionHeader subHeader={'check out'} mainHeader={"menu"}/>
            </div>

            <div className="grid grid-cols-3 gap-4">

                {menuItems.length > 0 && menuItems.map( i => (
                        <div className="max-w-sm mx-auto">
                            <MenuItem item={i}/>
                        </div>
                    ))}
            </div>

        </section>
    )
}