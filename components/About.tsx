"use client";

import { fetcher } from "@/fetcher";
import { urlFor } from "@/utils/imageUrlConvertor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageInfo } from "@/typings";
import LoadingSpinner from './LoadingSpinner';


export default function About() {
  const [pageInfoData, setPageInfoData] = useState<PageInfo>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await fetcher<PageInfo>("/api/getPageInfo");
        if (mounted) {
          setPageInfoData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching PageInfo:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading || !pageInfoData) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        ABOUT
      </h3>

      {pageInfoData?.profilePic && (
        <motion.img
          className="mt-40 md:mt-0 md:mb-0 flex-shrink-0 rounded-full w-56 h-56 object-cover md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[500px]"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          src={urlFor(pageInfoData.heroImage).url()}
          alt={""}
        />
      )}

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#F7AB0A]">little</span>{" "}
          background
        </h4>
        <p className="text-base h-[200px]">
          {pageInfoData?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}
