"use client";

import { motion } from "framer-motion";
import { Skill } from "@/typings";
import { urlFor } from "@/utils/imageUrlConvertor";

type Props = {
    skill: Skill;
    directionLeft?: boolean;
};

function SkillComponent({ skill, directionLeft }: Props) {
    return (
        <div className="group relative flex cursor-pointer">
            <motion.img
                initial={{
                    x: directionLeft ? -100 : 100,
                    opacity: 0,
                }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                src={urlFor(skill.image).url()}
                alt={skill.title}
                className="rounded-full border border-gray-500 object-cover w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 filter group-hover:grayscale transition duration-300 ease-in-out"
            />
            <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-16 w-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full z-0">
                <div className="flex items-center justify-center h-full">
                    <p className="text-2xl font-bold text-black opacity-100">
                        {skill.progress}%
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SkillComponent; 