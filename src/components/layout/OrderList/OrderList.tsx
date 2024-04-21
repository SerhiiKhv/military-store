import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import {OrderType} from "@/components/Types/OrderType";
import {ShopItemType} from "@/components/Types/ShopItem";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {useProfile} from "@/components/UseProfile";
import toast from "react-hot-toast";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";

export default function OrderList(
    {
        orders,
        openOrderStates,
        isAdminPage,

        setOrders,
        setOpenOrderStates,
    }:
        {
            orders: OrderType[],
            isAdminPage?: boolean,
            openOrderStates: any,
            setOpenOrderStates: any,
            setOrders: any
        }) {

    const {loading, data} = useProfile();

    const toggleOpenOrder = (orderId: string) => {
        setOpenOrderStates((prevStates: any) => ({
            ...prevStates,
            [orderId]: !prevStates[orderId]
        }));
    };

    function fetchOrder() {
        fetch('/api/order').then(res => {
            res.json().then(orders => {
                setOrders(orders)
            })
        })
    }

    async function handleOrderChangeStatus(data: OrderType) {
        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/order', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                })

                fetchOrder()
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
            loading: 'Change order status....',
            success: 'Order status change!',
            error: 'Error'
        })
    }

    async function handleOrderDelete(_id: string | undefined) {
        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/order?_id=' + _id, {
                    method: 'DELETE',
                })

                fetchOrder()
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
            loading: 'Creating deleting',
            success: 'Order delete!',
            error: 'Error'
        })
    }

    if (loading) {
        return 'Loading user info...'
    }

    return (
        <section className="bg-gray-100">
            <div className="my-container pb-8">
                <UserTabs isAdmin={data?.admin}/>
                <h1 className="text-xl pb-4">All orders</h1>
                {orders.map((order: OrderType) => (
                    <div key={order._id}>

                        {openOrderStates[order._id || ''] ? (
                            <div className="bg-white p-4 m-2 rounded-md">
                                <div className="flex justify-between items-center">
                                    <p>№ {order.orderNumber}</p>

                                    <div onClick={() => order._id && toggleOpenOrder(order._id)}>
                                        <FaChevronUp className="h-5 w-5"/>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-[2fr,3fr] grid-cols-1">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            {!order.status ? (
                                                <p className="text-orange-500">В процесі</p>
                                            ) : (
                                                <p className="text-green-500">Виконано</p>
                                            )}

                                            {data?.admin && isAdminPage && (
                                                <button className="buttonWithoutP p-1"
                                                        onClick={() => handleOrderChangeStatus({
                                                            ...order,
                                                            status: !order.status
                                                        })}>
                                                    {order.status ? <AiOutlineCheck/> : <AiOutlineClose/>}
                                                </button>
                                            )}
                                        </div>

                                        <div className="p-2">
                                            {order.delivery.address && order.delivery.deliveryMethod === "courier" && (
                                                <div>
                                                    <h1 className="text-gray-600 text-sm">Адреса доставки курєром</h1>
                                                    <h1>{order.delivery.address}</h1>
                                                </div>
                                            )}

                                            {order.delivery.deliveryMethod === "department" && (
                                                <div>
                                                    <h1 className="text-gray-600 text-sm">Адреса доставки нової
                                                        пошти</h1>
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
                                    <div className="space-y-2">
                                        {order.shopItems.map((shopItem: ShopItemType, index: any) => (
                                            <div key={index}
                                                 className="grid sm:grid-cols-[1fr,5fr,1fr] grid-cols-[1fr,3fr,1fr] gap-2">
                                                <Link href={`/shop-item/review/${shopItem._id}`}
                                                      target="_blank"
                                                      className="">
                                                    <Image src={shopItem.image[0] || '/pizza.png'} alt="Img menu item"
                                                           width={250}
                                                           height={250} className="w-full"/>
                                                </Link>

                                                <p>{shopItem.name}</p>
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
                            <div>
                                <div className="hidden sm:block">
                                    <div className="bg-white p-4 m-2 rounded-md flex justify-between">
                                        <div>
                                            <h1>№ {order.orderNumber} Дата доставки: {order.delivery.dateDelivery}</h1>
                                            {!order.status ? (
                                                <p className="text-orange-500">В процесі</p>
                                            ) : (
                                                <p className="text-green-500">Виконано</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            {order.shopItems.map((item: any, index: any) => (
                                                <Image key={index} src={item.image[0] || '/pizza.png'}
                                                       alt="Img menu item"
                                                       width={50}
                                                       height={50} className="w-24"/>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {data?.admin && isAdminPage && (
                                                <button className="delete p-2"
                                                        onClick={() => handleOrderDelete(order._id)}>
                                                    <MdDeleteForever className="h-6 w-6"/>
                                                </button>
                                            )}
                                            <div>
                                                <p>До сплати</p>
                                                <p className="font-semibold">{order.price}₴</p>
                                            </div>
                                            <div onClick={() => order._id && toggleOpenOrder(order._id)}>
                                                <FaChevronDown className="h-5 w-5"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:hidden block">
                                    <div className="bg-white p-4 m-2 rounded-md">
                                        <div>
                                            <div className="flex gap-2 justify-between">
                                                <h1 className="flex gap-2">№ {order.orderNumber}
                                                    {!order.status ? (
                                                        <p className="text-orange-500">В процесі</p>
                                                    ) : (
                                                        <p className="text-green-500">Виконано</p>
                                                    )}
                                                </h1>
                                                <div className="flex items-center gap-4">
                                                    {data?.admin && isAdminPage && (
                                                        <button className="delete p-2"
                                                                onClick={() => handleOrderDelete(order._id)}>
                                                            <MdDeleteForever className="h-6 w-6"/>
                                                        </button>
                                                    )}

                                                    <div onClick={() => order._id && toggleOpenOrder(order._id)}>
                                                        <FaChevronDown className="h-5 w-5"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <p>Дата доставки: {order.delivery.dateDelivery}</p>

                                        </div>
                                        <div className="flex gap-2">
                                            {order.shopItems.map((item: any, index: any) => (
                                                <Image key={index} src={item.image[0] || '/pizza.png'}
                                                       alt="Img menu item"
                                                       width={50}
                                                       height={50} className="w-24"/>
                                            ))}
                                        </div>

                                        <div className="flex gap-2 justify-end">
                                            <h1>До сплати: </h1>
                                            <h1 className="font-semibold">{order.price}₴</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}