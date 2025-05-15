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
      transition={{ duration: 0.3 }}
      className='flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 py-20'
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold mb-16"
      >
        <p className="uppercase tracking-[20px] text-gray-500 text-2xl ml-24 md:ml-0">
          {hobbiesData?.title || "HOBBIES"}
        </p>
      </motion.h1>

      <div className='relative w-4/5 max-w-6xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {hobbiesData?.hobbiesList?.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 5,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                transition: {
                  duration: 0.1,
                  ease: "easeOut"
                }
              }}
              style={{
                transform: 'scale(1) rotate(0deg)',
                boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                transition: 'all 0.1s ease-out'
              }}
              className='relative group overflow-hidden rounded-lg'
            >
              <div
                className='absolute inset-0 bg-gradient-to-r from-[#E57A44] to-[#251351] opacity-70 group-hover:opacity-100'
                style={{
                  transition: 'all 0.1s ease-out'
                }}
              />

              <div className='relative h-[200px] flex items-center justify-center'>
                <div
                  className='absolute inset-0 bg-white opacity-0 group-hover:opacity-10'
                  style={{
                    transition: 'all 0.1s ease-out'
                  }}
                />
                <div className='relative z-10 p-6'>
                  <h3 className='text-xl font-medium text-white text-center'>{hobby}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
