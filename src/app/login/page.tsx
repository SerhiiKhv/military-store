"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {ErrorType} from "@/components/Types/Errors";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<String>('')
    const [errors, setErrors] = useState<ErrorType>({ userName: '', email: '', password: '' });
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputFocused, setInputFocused] = useState('');

    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.replace("/");
        }
    }, [session, router]);

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if (!password || password.length < 0) {
            setError("Password is invalid");
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
            if (res?.url) router.replace("/");
        } else {
            setError("");
        }
    };


    const handleInputFocus = (fieldName: string) => {
        setInputFocused(fieldName);
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
    };

    const handleInputBlur = () => {
        setInputFocused('');
        validateForm();
    };


    const validateForm = () => {
        const newErrors = {...errors}

        if (inputFocused === 'email') {
            if (!email) {
                newErrors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                newErrors.email = 'Email is invalid.';
            }
        }

        if (inputFocused === 'password') {
            if (!password) {
                newErrors.password = 'Password is required.';
            } else if (password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters.';
            }
        }

        setErrors(newErrors);
        setIsFormValid(!!newErrors.email || !!newErrors.password || !!newErrors.userName);
    };


    return (
        <section className="mt-36">
            <div className="border rounded-2xl max-w-sm mx-auto p-8 ">
                <h1 className="text-center text-4xl gradientText font-semibold py-1">
                    Login
                </h1>

                <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                    {errors.email && <p className="text-red-500 -mb-4">{errors.email}</p>}
                    <input type="email"
                           placeholder="email"
                           value={email}
                           onChange={ev => setEmail(ev.target.value)}
                           onFocus={() => handleInputFocus('email')}
                           onBlur={handleInputBlur}/>

                    {errors.password && <p className="text-red-500 -mb-4">{errors.password}</p>}
                    <input type="password"
                           placeholder="password"
                           value={password}
                           onChange={ev => setPassword(ev.target.value)}
                           onFocus={() => handleInputFocus('password')}
                           onBlur={handleInputBlur}/>

                    <button type="submit" disabled={isFormValid}>Login</button>
                </form>

                {error && (
                    <div className="bg-gradient-to-br from-red-800 to-pink-400 my-4 text-center
                    text-white rounded-2xl p-2">
                        {error}
                    </div>
                )}

                <div className="text-right my-4 text-gray-500 text-sm">
                    <Link className="underline" href={'/forget-password'}>Forgot password?</Link>
                </div>

                <div className="my-4 text-gray-500 text-center">
                    or login with provider
                </div>


                <button onClick={() => signIn('google', {callbackUrl: '/'})}
                        className="flex gap-4 justify-center max-w-sm mx-auto">
                    <Image src={'/google.svg.webp'} alt={"google"} width={24} height={24}/>
                    Login with google
                </button>

                <div className="text-center my-4 text-gray-500">
                    Existing account?{' '}
                    <Link className="underline" href={'/register'}>Register here &raquo;</Link>
                </div>
            </div>
        </section>
    )
}