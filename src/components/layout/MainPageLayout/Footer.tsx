import Link from "next/link";
import React from "react";
import {IoIosMail} from "react-icons/io";
import {FaPhoneAlt} from "react-icons/fa";

export default function Footer(){
    return (
        <section className="text-white mt-8 bg-black">
            <div className="my-container py-6">
                <div className="grid sm:grid-cols-5 grid-cols-1 dm:space-y-0 space-y-6">
                    <div>
                        <Link className="bg-gradient-to-r from-purple-500 to-blue-600
                            bg-clip-text text-transparent font-semibold text-4xl" href="/">
                            ALANEC
                        </Link>
                    </div>
                    <div className="my-info-container">
                        <p className="font-bold text-xl">Інформація</p>
                        <p>Про ALANEC</p>
                        <p>Доставка та оплата</p>
                        <p>Політика конфіденційності</p>
                        <p>Договір оферти</p>
                        <p>Блог</p>
                    </div>
                    <div>
                        <div className="my-info-container">
                            <p className="font-bold text-xl">Служба підтримки</p>
                            <p>Контакти</p>
                            <p>Повернення і обмін</p>
                            <p>Support</p>
                            <p>Гарантія</p>
                        </div>
                    </div>
                    <div>
                        <div className="my-info-container">
                            <p className="font-bold text-xl">Послуги</p>
                            <p>Trade-in</p>
                            <p>Сервіс</p>
                            <p>Кредит</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-2 items-center justify-start">
                            <FaPhoneAlt className="h-4 w-4"/> +380684300806
                        </div>
                        <div className="flex gap-2 items-center justify-start">
                            <IoIosMail className="h-5 w-5"/> khvechuksergiyko@gmail.com
                        </div>
                    </div>
                </div>


                <footer className="border-t p-8 text-center text-gray-500
            mt-16 ">
                    &copy; 2024 All rights reserved
                </footer>
            </div>
        </section>
    )
}