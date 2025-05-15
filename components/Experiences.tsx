"use client";
import { fetcher } from "@/fetcher";
import { Experiences } from "@/schemas/experience";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
    const [experiences, setExperiences] = useState<Array<Experiences>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetcher<Array<Experiences>>("/api/getExperience");
                setExperiences(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
        >
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
                Experience
            </h3>
            <div className="mt-[5.5rem] w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
                {experiences &&
                    experiences.map((experience: Experiences, i) => {
                        return <ExperienceCard key={i} data={experience} />;
                    })}
            </div>
        </motion.div>
    );
}
