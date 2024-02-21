import React from 'react';
import Image from "next/image"
import {Right} from "@/components/icons/Right";

export const Hero = () => {
    return (
        <section className="hero px-10">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">
                    Everything<br />
                    is better<br />
                    with a&nbsp;
                    <span className="text-primaty">
                       Pizza
                    </span>
                </h1>
                <p className="my-4 text-gray-500 text-sm">
                    Pizza for you
                </p>

                <div className="flex gap-4">
                    <button className="flex items-center bg-primary text-white
                    px-4 py-2 rounded-full text-sm uppercase">
                        Order now
                        <Right/>
                    </button>

                    <button className="flex gap-2 py-2 text-gray-600 font-semibold">
                        Learn more
                        <Right/>
                    </button>
                </div>
            </div>

            <div className="relative">
                <Image src={'/pizza.png'} layout={'fill'}
                       objectFit={'contain'} alt={'pizza'}/>
            </div>
        </section>
    );
};