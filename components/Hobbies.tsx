'use client'

import { fetcher } from "@/fetcher";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type HobbiesData = {
  title: string;
  hobbiesList: string[];
};

export default function Hobbies() {
  const [hobbiesData, setHobbiesData] = useState<HobbiesData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher<HobbiesData>("/api/getHobbies");
        setHobbiesData(data);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='flex flex-col items-center justify-center h-screen'
    >
      <div className="relative">
        <h1 className="uppercase tracking-[20px] text-gray-500 text-2xl mt-12">
          {hobbiesData?.title || "Hobbies / Interests"}
        </h1>
      </div>

      <div className='flex-1 grid grid-cols-3 md:grid-cols-4 gap-5 w-3/4 mt-12'>
        {hobbiesData?.hobbiesList?.map((hobby, index) => (
          <div
            key={index}
            className='flex items-center justify-center rounded-3xl bg-gray-50 border transition duration-300 ease-in-out hover:bg-gray-100 p-4'
          >
            {hobby}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
