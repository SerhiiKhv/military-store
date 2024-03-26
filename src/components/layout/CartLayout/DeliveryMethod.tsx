import Image from "next/image";
import React from "react";

export default function DeliveryMethod(
    {streetAddress,
        deliveryMethod,
        setDeliveryMethod}:
        {streetAddress: string,
            deliveryMethod: string,
            setDeliveryMethod: any}
){

    function handleDeliveryOptionChange(e: any) {
        setDeliveryMethod(e.target.value)
    }

    return (
        <div className="bg-white mt-6 p-2 rounded-md">
            <p className="text-xl">2. Спосіб достаки</p>

            <div>
                <div className="border rounded-md p-2">
                    <div className="flex gap-2">
                        <input type="radio" value="department" checked={deliveryMethod === "department"}
                               onChange={handleDeliveryOptionChange}/>
                        <p>До відділення нової пошти</p>
                        <Image src={"/NewPost.png"} alt={"NewPost"}
                               width={25} height={25}/>
                    </div>

                    {deliveryMethod === "department" && (
                        <div>
                            <div className="flex gap-2 items-center justify-between">
                                <div className="w-full">
                                    <label>Дата доставки</label>
                                    <input type="text"/>
                                </div>

                                <div className="w-full">
                                    <label>Номер відділення</label>
                                    <input type="text"/>
                                </div>
                            </div>

                            <div className="flex gap-2 items-center justify-between">
                                <div className="w-full">
                                    <label>Прізвище</label>
                                    <input type="text"/>
                                </div>

                                <div className="w-full">
                                    <label>Ім'я</label>
                                    <input type="text"/>
                                </div>

                                <div className="w-full">
                                    <label>По батькові</label>
                                    <input type="text"/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <div className="border rounded-md p-2 mt-4">
                    <div>
                        <div className="flex gap-2">
                            <input type="radio" value="courier" checked={deliveryMethod === "courier"}
                                   onChange={handleDeliveryOptionChange}/>
                            <p>Курєр нової пошти</p>
                            <Image src={"/NewPost.png"} alt={"NewPost"}
                                   width={25} height={25}/>
                        </div>

                        {deliveryMethod === "courier" && (
                            <div>
                                <div className="flex gap-2 items-center justify-between">
                                    <div className="w-full">
                                        <label>Дата доставки</label>
                                        <input type="text"/>
                                    </div>

                                    <div className="w-full">
                                        <label>Час</label>
                                        <input type="text"/>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label>Адресса достаки</label>
                                    <input type="text" placeholder="Адресса"
                                           value={streetAddress}/>
                                </div>

                                <div className="flex gap-2 items-center justify-between">
                                    <div className="w-full">
                                        <label>Прізвище</label>
                                        <input type="text"/>
                                    </div>

                                    <div className="w-full">
                                        <label>Ім'я</label>
                                        <input type="text"/>
                                    </div>

                                    <div className="w-full">
                                        <label>По батькові</label>
                                        <input type="text"/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}