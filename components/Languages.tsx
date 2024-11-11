'use client'

import React from 'react';
import { motion } from "framer-motion";
import Language from './Language';

export default function languages() {

    const languages = ["Telugu", "Hindi", "English", "Kanadda", "Spanish"];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative xl:px-10 min-h-screen mx-auto items-center xl-space-y-0
                    text-center md:text-left xl:flex-row max-w-[2000px] md:flex-row mx-w-7xl px-10 justify-center "
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Languages
      </h3>
      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a language for current proficency
      </h3>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
        {languages &&
          languages.map((language, index) => {
            return <Language key={index} language={language} />;
          })}
      </div>
    </motion.div>
  )
}
