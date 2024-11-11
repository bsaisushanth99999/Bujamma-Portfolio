import React from 'react';
import { motion } from "framer-motion";
import { urlFor } from "@/utils/imageUrlConvertor";

export default function Language({ language } : {language : string}) {
  return (
    <div className="group relative flex cursor-pointer">
    {language && (
      <motion.img
        src= {urlFor("https://cdn.sanity.io/images/3n4nlnts/production/58f072b718b2c43df0b8330a1c28658bba06ddb2-2048x2048.png").url()}
        alt="No Image"
        initial={{
          x: true ? -100 : 100,
          opacity: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        className="border border-gray-500 rounded-full md:w-28 md:h-28  object-cover h-24 w-24 xl:w-32 xl:h-32 filter group-hover:grayscale transition-300 ease-in-out"
      />
    )}

    <div
      className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white
                      h-24 w-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full z-0"
    >
      <div className="flex items-center justify-center h-full">
        <p className="text-3xl font-bold text-black opacity-100 ">
          Fluient%
        </p>
      </div>
    </div>
  </div>
  )
}
