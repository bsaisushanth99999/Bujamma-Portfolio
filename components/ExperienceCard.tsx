import React from "react";
import { motion } from "framer-motion";
import { Experiences } from "@/schemas/experience";
import { urlFor } from "@/utils/imageUrlConvertor";
import Image from "next/image";

// type Props = {};

export default function ExperienceCard(props: { data: Experiences }) {
    return (
        <article
            className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[800px]
    snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden"
        >
            <motion.img
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className=" w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
                src={urlFor(props.data.companyImage).url()}
                alt="No Image"
            />

            <div className="px-0 md:px-10">
                <h4 className="text-4xl font-light">{props.data.company}</h4>
                <p className="text-2xl font-bold mt-1">{props.data.jobTitle}</p>
                <div className="flex space-x-2 my-2">
                    {props.data.technology &&
                        props.data.technology.map((data) => {
                            return (
                                <Image
                                    key={data._id}
                                    className="h-10 w-10 rounded-full"
                                    src={urlFor(data.image).url()}
                                    alt="No Image"
                                />
                            );
                        })}
                </div>
                <p className="uppercase py-5 text-gray-300">
                    {props.data.dateStarted.toLocaleDateString()} : {props.data.dateEnded ? props.data.dateEnded.toLocaleDateString() : "Current"}
                </p>

                <ul className="list-disc space-y-4 ml-5 text-md">
                    {props.data.points &&
                        props.data.points.map((point, i) => {
                            return <li key={i}>{point}</li>;
                        })}
                </ul>
            </div>
        </article>
    );
}
