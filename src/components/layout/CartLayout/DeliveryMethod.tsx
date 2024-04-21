import Image from "next/image";
import React from "react";
import {DeliveryType} from "@/components/Types/DeliveryType";
import {postOffice} from "@/components/layout/CartLayout/NovaPoshta";
import {Input} from "@/components/Custom/Input";

export default function DeliveryMethod({
                                           delivery,
                                           setDelivery,
                                       }: {
    delivery: DeliveryType,
    setDelivery: any
}) {
    function handleDeliveryOptionChange(e: any) {
        setDelivery({...delivery, deliveryMethod: e.target.value})
    }

    const fullName = () => {
        return <div className="sm:flex gap-2 grid grid-cols-1 justify-between">
            <Input type="text"
                   classNameDiv="w-full"
                   value={delivery.surName}
                   label={"Прізвище"}
                   onChange={e =>
                       setDelivery({...delivery, surName: e.target.value})}/>

            <Input type="text"
                   classNameDiv="w-full"
                   value={delivery.firstName}
                   label={"Ім'я"}
                   onChange={e =>
                       setDelivery({...delivery, firstName: e.target.value})}/>

            <Input type="text"
                   classNameDiv="w-full"
                   value={delivery.patronymic}
                   label={"По батькові"}
                   onChange={e =>
                       setDelivery({...delivery, patronymic: e.target.value})}/>
        </div>
    }

    return (
        <div className="bg-white mt-6 p-2 rounded-md">
            <p className="text-xl">2. Спосіб достаки</p>

            <div>
                <div className="border rounded-md p-2">
                    <div className="flex gap-2">
                        <input type="radio" value="department" checked={delivery?.deliveryMethod === "department"}
                               onChange={handleDeliveryOptionChange}/>
                        <p>До відділення нової пошти</p>
                        <Image src={"/NewPost.png"} alt={"NewPost"}
                               width={25} height={25}/>
                    </div>

                    {delivery?.deliveryMethod === "department" && (
                        <div>
                            <div className="sm:flex gap-2 grid grid-cols-1 items-center justify-between">
                                <Input type="date"
                                       classNameDiv="w-full"
                                       value={delivery.dateDelivery}
                                       label={"Дата доставки"}
                                       onChange={e =>
                                           setDelivery({...delivery, dateDelivery: e.target.value})}/>

                                <div className="w-full">
                                    <label>Номер відділення</label>
                                    <select value={delivery.departmentNumber}
                                            onChange={e =>
                                                setDelivery({...delivery, departmentNumber: e.target.value})}>
                                        <option value="">Оберіть номер відділення</option>
                                        {postOffice?.length > 0 && postOffice.map((c: string, index: number) => (
                                            <option key={index} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {fullName()}
                        </div>
                    )}
                </div>


                <div className="border rounded-md p-2 mt-4">
                    <div>
                        <div className="flex gap-2">
                            <input type="radio" value="courier" checked={delivery?.deliveryMethod === "courier"}
                                   onChange={handleDeliveryOptionChange}/>
                            <p>Курєр нової пошти</p>
                            <Image src={"/NewPost.png"} alt={"NewPost"}
                                   width={25} height={25}/>
                        </div>

                        {delivery?.deliveryMethod === "courier" && (
                            <div>
                                <div className="sm:flex grid grid-cols-1 gap-2 justify-between">
                                        <Input type="date"
                                               classNameDiv="w-full"
                                               value={delivery.dateDelivery}
                                               label={"Дата доставки"}
                                               onChange={e =>
                                                   setDelivery({...delivery, dateDelivery: e.target.value})}/>

                                        <Input type="time"
                                               classNameDiv="w-full"
                                               value={delivery.time}
                                               label={"Час доставки"}
                                               onChange={e =>
                                                   setDelivery({...delivery, time: e.target.value})}/>
                                </div>

                                <Input type="text"
                                       classNameDiv="w-full"
                                       value={delivery.address}
                                       label={"Адресса достаки"}
                                       onChange={e =>
                                           setDelivery({...delivery, address: e.target.value})}/>

                                {fullName()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
