import React, {useState} from "react";

export default function PaymentMethod(){

    const [paymentMethod, setPaymentMethod] = useState()
    function handlePaymentOptionChange(e: any) {
        setPaymentMethod(e.target.value)
    }
    return (
        <div className="bg-white mt-6 mb-4 p-2 rounded-md">
            <p className="text-xl">3. Спосіб оплати</p>

            <div className="flex gap-2 border rounded-md p-4">
                <input type="radio" value="cash" checked={paymentMethod === "cash"}
                       onChange={handlePaymentOptionChange}/>
                <p>Оплата при отриманні</p>
            </div>

            <div className="flex gap-2 mt-4 border rounded-md p-4">
                <input type="radio" value="cart" checked={paymentMethod === "cart"}
                       onChange={handlePaymentOptionChange}/>
                <p>Онлайн оплата</p>
            </div>
        </div>
    )
}