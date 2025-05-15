'use client'

import { fetcher } from "@/fetcher";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { urlFor } from "@/utils/imageUrlConvertor";

type Language = {
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
  flag: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  _key: string;
};

type LanguagesData = {
  title: string;
  languages: Language[];
};

export default function Languages() {
  const [languagesData, setLanguagesData] = useState<LanguagesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher<LanguagesData>("/api/getLanguages");
        setLanguagesData(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading languages...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen relative flex flex-col text-center md:text-left max-w-7xl px-10 mx-auto items-center justify-center pb-40"
    >
      <div className="flex flex-col space-y-4 pt-24 text-center">
        <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
          {languagesData?.title || "Languages"}
        </h3>

        <h3 className="uppercase tracking-[3px] text-gray-500 text-sm">
          Hover over a language for current proficiency
        </h3>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mt-10">
        {languagesData?.languages?.map((lang, index) => (
          <div key={lang._key} className="group relative flex cursor-pointer">
            {lang.flag && (
              <motion.img
                initial={{
                  x: index % 2 === 0 ? -100 : 100,
                  opacity: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, x: 0 }}
                src={urlFor(lang.flag).url()}
                alt={lang.language}
                className="border border-gray-500 rounded-full md:w-28 md:h-28 object-cover h-24 w-24 xl:w-32 xl:h-32 filter group-hover:grayscale transition-300 ease-in-out"
              />
            )}

            <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white
                          h-24 w-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full z-0">
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-xl font-bold text-black opacity-100">
                  {lang.language}
                </p>
                <p className="text-lg font-semibold text-black opacity-100">
                  {lang.proficiency.slice(0, 1).toUpperCase() + lang.proficiency.slice(1, lang.proficiency.length).toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
