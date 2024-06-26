'use client'

import React, {useEffect, useState} from "react";
import {OrderType} from "@/components/Types/OrderType";
import {useProfile} from "@/components/UseProfile";
import OrderList from "@/components/layout/OrderList/OrderList";

export default function Order() {
    const {data} = useProfile();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [openOrderStates, setOpenOrderStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (!data) return;
        const userId = data?._id;

        fetch('/api/order').then(res => {
            res.json().then(order => {
                const userOrders = order.filter((order: OrderType) => order.userId === userId);

                const initialOrderStates = userOrders.reduce((acc: any, curr: any) => {
                    acc[curr._id] = false;
                    return acc;
                }, {});

                setOrders(userOrders.reverse());
                setOpenOrderStates(initialOrderStates);
            })
        })
    }, [data]);


    return (
        <section>
            <OrderList orders={orders}
                       openOrderStates={openOrderStates}
                       setOpenOrderStates={setOpenOrderStates}
                       setOrders={setOrders}/>
        </section>
    );
}
