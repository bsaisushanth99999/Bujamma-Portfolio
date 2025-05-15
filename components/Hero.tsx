"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import { urlFor } from "@/utils/imageUrlConvertor";
import { fetcher } from "@/fetcher";
import { Corinthia } from 'next/font/google';
import { Resume } from "@/typings";
import Image from "next/image";

const corinthia = Corinthia({
    weight: '400',
    subsets: ['latin'],
});


export default function Hero() {
    const [text] = useTypewriter({
        words: [],
        loop: true,
        delaySpeed: 2000,
    });
    const [pageInfoData, setPageInfoData] = useState<Resume | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetcher<Resume>("/api/getResume");

                if (!data) {
                    setError("No resume data found");
                    return;
                }

                setPageInfoData(data);
            } catch (error) {
                console.error("Error fetching resume:", error);
                setError("Failed to fetch resume data");
            }
        };

        fetchData();
    }, []);

    return (
        <motion.div className="relative h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
            {/* Watermark - place it outside content and behind using z-0 */}
            <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
                <span className={`${corinthia.className} text-[12rem] text-gray-300 opacity-25 italic select-none whitespace-nowrap allura-regular`}>
                    Dr. Tejaswini Nagammagari
                </span>
            </div>

            {/* Background effects */}
            <BackgroundCircles />

            {error && <div className="text-red-500">{error}</div>}

            {pageInfoData?.photo && (
                <Image
                    src={urlFor(pageInfoData.photo).url()}
                    alt="Profile Photo"
                    width={160}
                    height={160}
                    className="relative rounded-full mx-auto object-cover z-10"
                />
            )}

            <div className="z-10">
                <h2 className="text-5xl uppercase text-gray-500 pb-2 tracking-[15px]">
                    MBBS | MPH
                </h2>
                <h1 className="text-5xl lg:text-6xl font-semibold px-10">
                    <span className="mr-3">{text}</span>
                    {/* <Cursor cursorColor="#F7ABB0A" /> */}
                </h1>
            </div>
        </motion.div>
    );

}
