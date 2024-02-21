import {Hero} from "@/components/layout/Hero";
import {HomeMenu} from "@/components/layout/HomeMenu";
import {SectionHeader} from "@/components/layout/SectionHeader";
import React from "react";

export default function Home() {
    return (
        <>
            <Hero/>
            <HomeMenu/>
            <section className="text-center my-16" id="about">
                <SectionHeader subHeader={'Our story'}
                               mainHeader={"About Us"}/>
                <div className="max-w-2xl mx-auto text-gray-500 mt-4">
                    <p className="">
                        asdasdasdasdfasdhfh asd hfhasdk
                        hkjh uahsdfkj haksh khhasdfkh askdhf
                        kashd fhaskd fhak sfkashdfk ha
                    </p>

                    <p className="">
                        asdasdasdasdfasdhfh asd hfhasdk
                        hkjh uahsdfkj haksh khhasdfkh askdhf
                        kashd fhaskd fhak sfkashdfk haasdf
                        asdf asdf asd f asdf asdf asdf
                        asdfasdfasdf
                        afdsasdf asdf
                        adfsadfs
                    </p>
                </div>
            </section>

            <section className="text-center my-8" id="contact">
                <SectionHeader subHeader={'Don\'t hesitate'}
                               mainHeader={"Contact Us"}/>

                <div className="mt-8">
                    <a className="text-4xl underline text-gray-500"
                       href="tel: +380684300807">
                        +380 684 300 807
                    </a>
                </div>

                <footer className="border-t p-8 text-center text-gray-500
            mt-16 ">
                    &copy; 2024 All rights reserved
                </footer>
            </section>
        </>
    )
}
