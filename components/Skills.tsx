"use client";

import { fetcher } from "@/fetcher";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type SkillsData = {
    title: string;
    clinicalSkills: string[];
    generalSkills: string[];
};

export default function Skills() {
    const [skillsData, setSkillsData] = useState<SkillsData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetcher<SkillsData>("/api/getSkills");
                setSkillsData(data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="min-h-screen relative flex flex-col text-center md:text-left max-w-[2000px] justify-center mx-auto items-center"
        >
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
                {skillsData?.title || "Skills"}
            </h3>

            <div className="w-full mt-32 px-10 flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Clinical Skills - Left Side */}
                <div className="w-full md:w-1/2">
                    <h4 className="text-xl font-semibold mb-4 text-[#F7AB0A]">
                        Clinical Skills
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {skillsData?.clinicalSkills?.map((skill, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* General Skills - Right Side */}
                <div className="w-full md:w-1/2">
                    <h4 className="text-xl font-semibold mb-4 text-[#F7AB0A]">
                        General Skills
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {skillsData?.generalSkills?.map((skill, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
