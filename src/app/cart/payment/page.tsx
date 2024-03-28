'use client'

import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/AppContext";
import {useSession} from "next-auth/react";
import ListCartItems from "@/components/layout/CartLayout/ListCartItems";
import CartContactInformation from "@/components/layout/CartLayout/CartContactInformation";
import DeliveryMethod from "@/components/layout/CartLayout/DeliveryMethod";
import PaymentMethod from "@/components/layout/CartLayout/PaymentMethod";
import toast from "react-hot-toast";
import {OrderType} from "@/components/Types/OrderType";
import {DeliveryType} from "@/components/Types/DeliveryType";

export default function PaymentPage() {
    const session = useSession()
    const {status} = session
    const {cartProducts} = useContext(CartContext) as any;
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('cart')
    const [delivery, setDelivery] = useState<DeliveryType>(
        {
            streetAddress: "",
            deliveryMethod: "",
            dateDelivery: "",
            departmentNumber: "",
            surName: "",
            firstName: "",
            patronymic: "",
            address: "",
            time: ""
        })



    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUserId(data?._id || '')
                    setUserName(data?.name || '')
                    setUserEmail(data?.email || '')
                    setDelivery({...delivery, address: data?.address || ''})
                    setPhoneNumber(data?.phone || '')
                })
            })
        }
    }, [session, status]);


    async function onSubmit(e: any, data: OrderType) {
        e.preventDefault()

        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/order', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                })

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
            loading: 'Creating new order',
            success: 'Order created!',
            error: 'Error'
        })
    }


    let total = 0

    for (const p of cartProducts) {
        total += p.price
    }

    return (
        <section className="bg-gray-100 pt-4 min-h-screen">
            <form className="p-4 mx-auto"
                  onSubmit={e => onSubmit(e,
                      {
                          userId,
                          shopItems: cartProducts,
                          contactInformation: {name: userName, email: userEmail, phone: phoneNumber},
                          delivery: delivery,
                          payment: paymentMethod,
                          status: false,
                          price: total
                      }
                  )}
            >
                <div className="my-container">
                    <p className="text-xl">Оформити замовлення</p>
                    <div className="grid grid-cols-[3fr,1fr] gap-4">
                        <div>
                            <ListCartItems/>

                            <CartContactInformation
                                phoneNumber={phoneNumber}
                                userName={userName}
                                userEmail={userEmail}
                                setUserEmail={setUserEmail}
                                setPhoneNumber={setPhoneNumber}
                                setUserName={setUserName}/>

                            <DeliveryMethod delivery={delivery}
                                            setDelivery={setDelivery}/>

                            <PaymentMethod paymentMethod={paymentMethod}
                                           setPaymentMethod={setPaymentMethod}/>
                        </div>


                        <div className="bg-white rounded-md max-h-96">
                            <div className="m-4 p-3">
                                <p className="text-2xl">Разом:</p>

                                <div className="flex justify-between pt-8">
                                    <p>{cartProducts.length} товари на суму</p>
                                    <p>{total} ₴</p>
                                </div>

                                <div className="flex justify-between pt-2">
                                    <p>Знижка</p>
                                    <p>0 ₴</p>
                                </div>

                                <div className="flex justify-between pt-2">
                                    <p>Вартість доставки</p>
                                    <p>0 ₴</p>
                                </div>

                                <div className="flex justify-between pt-12 font-semibold">
                                    <p>До сплати</p>
                                    <p className="text-xl">{total} ₴</p>
                                </div>

                                <button type="submit"
                                        className="buttonWithoutP w-full p-4 text-center mt-6">
                                    Оформити замовлення
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}