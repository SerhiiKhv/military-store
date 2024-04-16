import Image from "next/image";
import React from "react";
import { DeliveryType } from "@/components/Types/DeliveryType";

export default function DeliveryMethod({
                                           delivery,
                                           setDelivery,
                                       }: {
    delivery: DeliveryType,
    setDelivery: any
}) {
    function handleDeliveryOptionChange(e: any) {
        setDelivery({ ...delivery, deliveryMethod: e.target.value })
    }

    return (
        <div className="bg-white mt-6 p-2 rounded-md">
            <p className="text-xl">2. Спосіб достаки</p>

            <div>
                <div className="border rounded-md p-2">
                    <div className="flex gap-2">
                        <input type="radio" value="department" checked={delivery?.deliveryMethod === "department"}
                               onChange={handleDeliveryOptionChange} />
                        <p>До відділення нової пошти</p>
                        <Image src={"/NewPost.png"} alt={"NewPost"}
                               width={25} height={25} />
                    </div>

                    {delivery?.deliveryMethod === "department" && (
                        <div>
                            <div className="sm:flex gap-2 grid grid-cols-1 items-center justify-between">
                                <div className="w-full">
                                    <label>Дата доставки</label>
                                    <input
                                        type="text"
                                        value={delivery.dateDelivery}
                                        onChange={e =>
                                            setDelivery({ ...delivery, dateDelivery: e.target.value })}
                                    />
                                </div>

                                <div className="w-full">
                                    <label>Номер відділення</label>
                                    <input type="text" value={delivery.departmentNumber}
                                           onChange={e =>
                                               setDelivery({ ...delivery, departmentNumber: e.target.value })} />
                                </div>
                            </div>

                            <div className="sm:flex grid grid-cols-1 gap-2 items-center justify-between">
                                <div className="w-full">
                                    <label>Прізвище</label>
                                    <input type="text" value={delivery.surName}
                                           onChange={e =>
                                               setDelivery({ ...delivery, surName: e.target.value })} />
                                </div>

                                <div className="w-full">
                                    <label>Ім&apos;я</label>
                                    <input type="text" value={delivery.firstName}
                                           onChange={e =>
                                               setDelivery({ ...delivery, firstName: e.target.value })} />
                                </div>

                                <div className="w-full">
                                    <label>По батькові</label>
                                    <input type="text" value={delivery.patronymic}
                                           onChange={e =>
                                               setDelivery({ ...delivery, patronymic: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <div className="border rounded-md p-2 mt-4">
                    <div>
                        <div className="flex gap-2">
                            <input type="radio" value="courier" checked={delivery?.deliveryMethod === "courier"}
                                   onChange={handleDeliveryOptionChange} />
                            <p>Курєр нової пошти</p>
                            <Image src={"/NewPost.png"} alt={"NewPost"}
                                   width={25} height={25} />
                        </div>

                        {delivery?.deliveryMethod === "courier" && (
                            <div>
                                <div className="sm:flex grid grid-cols-1 gap-2 items-center justify-between">
                                    <div className="w-full">
                                        <label>Дата доставки</label>
                                        <input type="text"
                                               value={delivery.dateDelivery}
                                               onChange={e =>
                                                   setDelivery({ ...delivery, dateDelivery: e.target.value })} />
                                    </div>

                                    <div className="w-full">
                                        <label>Час</label>
                                        <input type="text"
                                               value={delivery.time}
                                               onChange={e =>
                                                   setDelivery({ ...delivery, time: e.target.value })} />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label>Адресса достаки</label>
                                    <input type="text" placeholder="Адресса"
                                           value={delivery.address}
                                           onChange={e =>
                                               setDelivery({ ...delivery, address: e.target.value })} />
                                </div>

                                <div className="sm:flex gap-2 grid grid-cols-1 items-center justify-between">
                                    <div className="w-full">
                                        <label>Прізвище</label>
                                        <input type="text" value={delivery.surName}
                                               onChange={e =>
                                                   setDelivery({ ...delivery, surName: e.target.value })} />
                                    </div>

                                    <div className="w-full">
                                        <label>Ім&apos;я</label>
                                        <input type="text" value={delivery.firstName}
                                               onChange={e =>
                                                   setDelivery({ ...delivery, firstName: e.target.value })} />
                                    </div>

                                    <div className="w-full">
                                        <label>По батькові</label>
                                        <input type="text" value={delivery.patronymic}
                                               onChange={e =>
                                                   setDelivery({ ...delivery, patronymic: e.target.value })} />
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
