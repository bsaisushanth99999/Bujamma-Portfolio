'use client'


import { motion } from "framer-motion";

export default function Hobbies() {

  const hobbies = ["cricket", "football", "coding", "hacking", "movies", "love", "friendship", "relationship", "poetry", "kidding", "smiling", "etc", "etc2"];

  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }} 
    className='flex flex-col items-center justify-center h-screen'>
        <div className="relative">
          <h1 className="uppercase tracking-[20px] text-gray-500 text-2xl mt-12">
            Hobbies / INTRESTS
          </h1>
        </div>

      <div className='flex-1 grid grid-cols-3 md:grid-cols-4 gap-5 w-3/4 mt-12'>
      {hobbies.map((x, index) => (
        <div key={index} className='flex items-center justify-center rounded-3xl bg-gray-50 border transition duration-300 ease-in-out'>
          {x}
        </div>
      ))}
    </div>
    </motion.div>
  )
}
