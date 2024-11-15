"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { urlFor } from "@/utils/imageUrlConvertor";
import { fetcher } from "@/fetcher";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Workshop } from "@/typings";

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data = await fetcher<Workshop[]>("/api/getWorkshops");
        setWorkshops(data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen mx-auto items-center overflow-hidden
                    max-w-full md:flex-row px-10 justify-evenly text-left z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Workshops
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
        {workshops.map((workshop) => (
          <div
            key={workshop._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-20 h-screen"
          >
            {workshop.image && (
              <motion.img
                initial={{ y: -100, opacity: 0 }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                src={urlFor(workshop.image).url()}
                alt={workshop.title}
                className="md:h-60 md:w-100 xl:mt-20 xl:w-[700px] xl:h-[400px]"
              />
            )}

            <div className="space-y-10 px-0 md:px-10 w-80 overflow-x-hidden h-80 md:w-auto md:h-auto">
              <h4 className="text-4xl font-semibold text-center">
                {workshop.title}
              </h4>
              <p className="text-lg text-center md:text-left mb-0 h-60 md:h-auto">
                {workshop.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
}
