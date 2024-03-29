'use client'

import React, {useEffect, useState} from "react";
import {OrderType} from "@/components/Types/OrderType";
import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import {ChevronDownIcon} from "@/components/icons/ChevronDownIcon";
import {ChevronUpIcon} from "@/components/icons/ChevronUpIcon";
import {ShopItemType} from "@/components/Types/ShopItem";
import Link from "next/link";

export default function Order() {
    const {loading, data} = useProfile();
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

                setOrders(userOrders);
                setOpenOrderStates(initialOrderStates);
            })
        })
    }, [data]);

    const toggleOpenOrder = (orderId: string) => {
        setOpenOrderStates(prevStates => ({
            ...prevStates,
            [orderId]: !prevStates[orderId]
        }));
    };

    if (loading) {
        return 'Loading user info...'
    }

    return (
        <section className="bg-gray-100">
            <div className="my-container pb-8">
                <UserTabs/>
                <h1 className="text-xl pb-4">My orders</h1>
                {orders.map((order: OrderType) => (
                    <div key={order._id}>

                        {openOrderStates[order._id || ''] ? (
                            <div className="bg-white p-4 m-2 rounded-md">
                                <div className="flex justify-between items-center">
                                    <p>№ {order.orderNumber}</p>

                                    <div onClick={() => order._id && toggleOpenOrder(order._id)}>
                                        <ChevronUpIcon/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-[2fr,3fr]">
                                    <div>
                                        {!order.status ? (
                                            <p className="text-orange-500">В процесі</p>
                                        ) : (
                                            <p className="text-green-500">Виконано</p>
                                        )}

                                        <div className="p-2">
                                            {order.delivery.address && order.delivery.deliveryMethod === "courier" && (
                                                <div>
                                                    <h1 className="text-gray-600 text-sm">Адреса доставки курєром</h1>
                                                    <h1>{order.delivery.address}</h1>
                                                </div>
                                            )}

                                            {order.delivery.address && order.delivery.deliveryMethod === "department" && (
                                                <div>
                                                    <h1 className="text-gray-600 text-sm">Адреса доставки нової пошти</h1>
                                                    <h1>{order.delivery.departmentNumber}</h1>
                                                </div>
                                            )}

                                            <div className="py-2">
                                                <h1 className="text-gray-600 text-sm">Отримувач замовлення</h1>
                                                <h1>{order.delivery?.surName} {order.delivery?.firstName} {order.delivery?.patronymic}</h1>
                                            </div>

                                            <div className="py-2">
                                                <h1 className="text-gray-600 text-sm">Контактна інформація</h1>
                                                <h1>{order.contactInformation.phone}</h1>
                                                <h1>{order.contactInformation.email}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {order.shopItems.map((shopItem: ShopItemType, index: any) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <Link href={`/shop-item/review/${shopItem._id}`}
                                                      target="_blank"
                                                      className="flex gap-2 items-center justify-between">
                                                    <Image src={shopItem.image || '/pizza.png'} alt="Img menu item"
                                                           width={50}
                                                           height={50} className="w-24"/>

                                                    <p>{shopItem.name}</p>
                                                </Link>

                                                <p className="font-semibold">{shopItem.price}₴</p>
                                            </div>
                                        ))}

                                        <div className="border-t">
                                            <div className="flex justify-between">
                                                <p>Оплата</p>
                                                <p>{order.payment}</p>
                                            </div>

                                            <div className="flex justify-between">
                                                <p>Доставка</p>
                                                <p>{order.delivery.deliveryMethod}</p>
                                            </div>

                                            <div className="flex justify-between">
                                                <p>Разом</p>
                                                <p className="font-semibold">{order.price}₴</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <div className="bg-white p-4 m-2 rounded-md flex justify-between">
                                <div>
                                    <p>№ {order.orderNumber} Дата доставки: {order.delivery.dateDelivery}</p>
                                    {!order.status ? (
                                        <p className="text-orange-500">В процесі</p>
                                    ) : (
                                        <p className="text-green-500">Виконано</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {order.shopItems.map((item: any, index: any) => (
                                        <Image key={index} src={item.image || '/pizza.png'} alt="Img menu item"
                                               width={50}
                                               height={50} className="w-24"/>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p>До сплати</p>
                                        <p className="font-semibold">{order.price}₴</p>
                                    </div>
                                    <div onClick={() => order._id && toggleOpenOrder(order._id)}>
                                        <ChevronDownIcon/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
