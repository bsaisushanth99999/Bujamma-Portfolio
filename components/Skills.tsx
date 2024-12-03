"use client";

import { fetcher } from "@/fetcher";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type SkillsData = {
    title: string;
    clinicalSkills: string[];
    generalSkills: string[];
    technicalSkills: string[];
};

export default function Skills() {
    const [skillsData, setSkillsData] = useState<SkillsData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetcher<SkillsData>("/api/getSkills");
                console.log(data);
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
            className="min-h-screen w-[75%] relative flex flex-col text-center md:text-left max-w-[2000px] justify-center mx-auto items-center"
        >
            <h3 className="absolute top-16 uppercase tracking-[20px] text-gray-500 text-2xl ml-24 md:ml-0">
                {skillsData?.title || "Skills"}
            </h3>

            <div className="w-full md:ml-48 pl-16 md:pl-0 mt-16 md:mt-0 px-4 md:px-10 flex flex-col md:flex-row justify-between items-start gap-12">
                {/* Clinical Skills Section */}
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/3 md:ml-8 mt-24 md:mt-0"
                >
                    <h4 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Clinical Skills
                    </h4>
                    <div className="space-y-4">
                        {skillsData?.clinicalSkills?.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center group"
                            >
                                <span className="h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 group-hover:scale-125 transition-all duration-300" />
                                <span className="ml-4 text-gray-700 group-hover:text-black group-hover:translate-x-2 transition-all duration-300">
                                    {skill}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* General Skills Section */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/3"
                >
                    <h4 className="text-2xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        General Skills
                    </h4>
                    <div className="space-y-4">
                        {skillsData?.generalSkills?.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center group"
                            >
                                <span className="h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:scale-125 transition-all duration-300" />
                                <span className="ml-4 text-gray-700 group-hover:text-black group-hover:translate-x-2 transition-all duration-300">
                                    {skill}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technical Skills Section */}
                <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/3"
                >
                    <h4 className="text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
                        Technical Skills
                    </h4>
                    <div className="space-y-4">
                        {skillsData?.technicalSkills?.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center group"
                            >
                                <span className="h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 group-hover:scale-125 transition-all duration-300" />
                                <span className="ml-4 text-gray-700 group-hover:text-black group-hover:translate-x-2 transition-all duration-300">
                                    {skill}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
