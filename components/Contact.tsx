"use client";

import { fetcher } from "@/fetcher";
import { PageInfo } from "@/typings";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import LoadingSpinner from './LoadingSpinner';

export default function Contact() {
  const [pageInfoData, setPageInfoData] = useState<PageInfo>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const timestamp = new Date().getTime();
      const data = await fetcher<PageInfo>(`/api/getPageInfo?t=${timestamp}`);
      setPageInfoData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching PageInfo:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchAndSetData = async () => {
      if (mounted) {
        await fetchData();
      }
    };

    fetchAndSetData();

    // Set up an interval to refresh data every 30 seconds
    const intervalId = setInterval(fetchAndSetData, 30000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
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
      className="h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact
      </h3>

      <div className="flex flex-col space-y-10">
        <br />
        <br />
        <h4 className="text-4xl font-semibold text-center">
          Get in {" "}
          <span className="decoration-[#F7AB0A]/50 underline">touch.</span>
        </h4>

        <div className="space-y-10">
          {pageInfoData?.phoneNumber && (
            <div className="flex items-center space-x-5 justify-center">
              <FaPhone className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
              <p className="text-2xl">{pageInfoData.phoneNumber}</p>
            </div>
          )}

          {pageInfoData?.email && (
            <div className="flex items-center space-x-5 justify-center">
              <FaEnvelope className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
              <p className="text-2xl">{pageInfoData.email}</p>
            </div>
          )}

          {pageInfoData?.address && (
            <div className="flex items-center space-x-5 justify-center">
              <FaMapMarkerAlt className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
              <p className="text-2xl">{pageInfoData.address}</p>
            </div>
          )}
        </div>

        <form className="flex flex-col space-y-2 w-fit mx-auto">
          <div className="flex space-x-2">
            <input
              placeholder="Name"
              className="contactInput"
              type="text"
            />
            <input
              placeholder="Email"
              className="contactInput"
              type="email"
            />
          </div>

          <input
            placeholder="Subject"
            className="contactInput"
            type="text"
          />

          <textarea
            placeholder="Message"
            className="contactInput"
          />
          <button
            type="submit"
            className="bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}
