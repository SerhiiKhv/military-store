"use client";

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {ErrorType} from "@/components/Types/Errors";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [errors, setErrors] = useState<ErrorType>({ userName: '', email: '', password: '' });
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputFocused, setInputFocused] = useState('');

    const router = useRouter();

    async function handleFormSubmit(ev: any) {
        ev.preventDefault();
        setCreatingUser(true);

        if (!isFormValid) {
            const creatingPromise = new Promise<void>(async (resolve, reject) => {
                try {
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        body: JSON.stringify({ email, password, name: userName }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    setCreatingUser(false);

                    if (response.ok) {
                        resolve();
                    } else {
                        reject();
                    }

                    router.replace("/login");
                } catch (error) {
                    reject(error);
                }
            });

            await toast.promise(creatingPromise, {
                loading: 'Register...',
                success: 'Register success!',
                error: 'Error'
            });
        }
    }

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

        if (inputFocused === 'userName') {
            if (!userName) {
                newErrors.userName = 'Name is required.';
            }else{
                newErrors.userName = ''
            }
        }

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
            <div className={`border rounded-2xl max-w-sm mx-auto p-8 `}>
                <h1 className="text-center gradientText p-1 text-4xl font-semibold">
                    Register
                </h1>
                <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                    {errors.userName && <p className="text-red-500 -mb-4">{errors.userName}</p>}
                    <input
                        type="text"
                        placeholder="name"
                        value={userName}
                        disabled={creatingUser}
                        onChange={ev => setUserName(ev.target.value)}
                        onFocus={() => handleInputFocus('userName')}
                        onBlur={handleInputBlur}
                    />

                    {errors.email && <p className="text-red-500 -mb-4">{errors.email}</p>}
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        disabled={creatingUser}
                        onChange={ev => setEmail(ev.target.value)}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                    />

                    {errors.password && <p className="text-red-500 -mb-4">{errors.password}</p>}
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        disabled={creatingUser}
                        onChange={ev => setPassword(ev.target.value)}
                        onFocus={() => handleInputFocus('password')}
                        onBlur={handleInputBlur}
                    />

                    <button type="submit" className="button w-full" disabled={creatingUser || isFormValid}>Register</button>
                </form>

                <div className="my-4 text-gray-500 text-center">
                    or login with provider
                </div>

                <button onClick={() => signIn('google', { callbackUrl: '/' })}
                        className="button flex gap-4 justify-center max-w-sm mx-auto">
                    <Image src={'/google.svg.webp'} alt={"google"} width={24} height={24} />
                    Login with google
                </button>

                <div className="text-center my-4 text-gray-500">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </div>
        </section>
    );
}