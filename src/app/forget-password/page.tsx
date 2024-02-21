"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Boolean | String>(false)
    const route = useRouter()
    const {data: session, status: sessionStatus} = useSession()

    useEffect(() => {
        if(sessionStatus === "authenticated"){
            route.replace("/")
        }
    }, [sessionStatus, route]);

    async function handleFormSubmit(ev: any) {
        ev.preventDefault();

        try {
            const res = await signIn("credentials",
                {redirect: false, email, password});

            if (res && res.error) {
                setError("Invalid Credentials");
            }

        } catch (error) {
            console.error("Error during form submission:", error);
            setError(true);
        }
    }


    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Forget Password Page
            </h1>

            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br/>
                    Please try again later
                </div>
            )}

            <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                       onChange={ev => setEmail(ev.target.value)}/>

                <button type="submit">Submit</button>
            </form>

            <div className="text-center my-4 text-gray-500">
                Existing account?{' '}
                <Link className="underline" href={'/login'}>Login here &raquo;</Link>
            </div>
        </section>
    )
}