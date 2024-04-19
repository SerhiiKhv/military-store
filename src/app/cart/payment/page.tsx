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
import {useRouter} from "next/navigation";
import Link from "next/link";
import {HiOutlinePencil} from "react-icons/hi";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

export default function PaymentPage() {
    const router = useRouter()
    const session = useSession()
    const {status} = session
    const {cartProducts, clearCart} = useContext(CartContext) as any;

    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);

    deliveryDate.setDate(deliveryDate.getDate() + 2);
    const formattedDeliveryDate = deliveryDate.toISOString().split('T')[0];

    const [isCartPageOpen, setIsCartPageOpen] = useState(true)

    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('cart')
    const [delivery, setDelivery] = useState<DeliveryType>(
        {
            streetAddress: "",
            deliveryMethod: "",
            dateDelivery: formattedDeliveryDate,
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
                    //setDelivery({...delivery, address: data?.address || ''})
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
                submitForm()
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

    function submitForm() {
            router.replace("/order");
            clearCart()
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
                    <div className="grid sm:grid-cols-[3fr,1fr] grid-cols-1 gap-4">
                        <div>
                            <div className="flex justify-between">
                                <p>Ваше замовлення</p>
                                <div className="flex gap-6">
                                    <Link
                                        href={'/cart'}
                                        className="flex gap-1">
                                        <HiOutlinePencil className='h-5 w-5'/>
                                        Редагувати
                                    </Link>

                                    {isCartPageOpen ? (
                                        <div onClick={() => setIsCartPageOpen(false)}>
                                            <FaChevronUp />
                                        </div>
                                    ) : (
                                        <div onClick={() => setIsCartPageOpen(true)}>
                                            <FaChevronDown />
                                        </div>
                                    )}
                                </div>

                            </div>

                            {isCartPageOpen && (<ListCartItems/>)}

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