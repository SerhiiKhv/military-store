'use client'

import React, {useEffect, useState} from "react";
import {OrderType} from "@/components/Types/OrderType";
import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import {ChevronDownIcon} from "@/components/icons/ChevronDownIcon";

export default function Order() {

    const [orders, setOrders] = useState<OrderType[]>()
    const {loading, data} = useProfile();

    console.log(orders)

    useEffect(() => {
        fetch('/api/order').then(res => {
            res.json().then(order => {
                setOrders(order)
            })
        })
    }, [])

    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    return (
        <section className="bg-gray-100">
            <div className="my-container">
                <UserTabs isAdmin={data?.admin}/>
                <h1 className="text-xl pb-4">My orders</h1>
                {orders && orders.map(order => (
                        <div className="bg-white p-4 m-2 rounded-md flex justify-between">
                            <div>
                                <p>№ {order.orderNumber} Дата доставки: {order.delivery.dateDelivery}</p>

                                {!order.status ?
                                    <p className="text-orange-500">В процесі</p> :
                                    <p className="text-green-500">Виконано</p>
                                }
                            </div>

                            <div className="flex gap-2">
                                {order.shopItems[0].image &&
                                    <Image src={order.shopItems[0].image || '/pizza.png'}
                                           alt={"Img menu item"}
                                           width={50} height={50}
                                           className="w-24"/>}
                                {order.shopItems[1].image &&
                                    <Image src={order.shopItems[1].image || '/pizza.png'}
                                           alt={"Img menu item"}
                                           width={50} height={50}
                                           className="w-24"/>
                                }
                                {order.shopItems[2].image &&
                                    <Image src={order.shopItems[2].image || '/pizza.png'}
                                           alt={"Img menu item"}
                                           width={50} height={50}
                                           className="w-24"/>
                                }
                            </div>

                            <div className="flex items-center gap-4">
                                <div>
                                    <p>До сплати</p>
                                    <p className="font-semibold">{order.price}₴</p>
                                </div>
                                <div>
                                    <ChevronDownIcon/>
                                </div>

                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}