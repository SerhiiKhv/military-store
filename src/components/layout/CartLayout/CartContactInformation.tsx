import React from "react";

export default function CartContactInformation({
                                                   phoneNumber,
                                                   setPhoneNumber,
                                                   userName,
                                                   setUserName,
                                                   userEmail,
                                                   setUserEmail
                                               }: {
    phoneNumber: string,
    userName: string,
    userEmail: string,
    setUserEmail(userEmail: string): void,
    setPhoneNumber(phoneNumber: string): void,
    setUserName(userName: string): void
}) {
    return (
        <div className="bg-white mt-6 p-8 rounded-md">
            <p className="text-xl">1. Контактна інформація</p>

            <div className="flex gap-2 items-center justify-between">
                <div className="w-full">
                    <label>Номер телефону</label>
                    <input type="text" value={phoneNumber}
                           onChange={e => setPhoneNumber(e.target.value)} />
                </div>

                <div className="w-full">
                    <label>Ім&apos;я</label>
                    <input type="text" value={userName}
                           onChange={e => setUserName(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <label>Email</label>
                    <input type="text" value={userEmail}
                           onChange={e => setUserEmail(e.target.value)} />
                </div>
            </div>
        </div>
    )
}
