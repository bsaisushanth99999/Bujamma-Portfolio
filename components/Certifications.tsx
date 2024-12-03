'use client'

import { fetcher } from "@/fetcher";
import { urlFor } from "@/utils/imageUrlConvertor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CertificationsData } from "@/typings";
import Image from "next/image";

export default function Certifications() {
  const [certificationsData, setCertificationsData] = useState<CertificationsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher<CertificationsData>("/api/getCertifications");
        console.log("Fetched certifications data:", data);
        setCertificationsData(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen overflow-y-auto'>
      <h1 className="uppercase tracking-[20px] text-gray-500 text-2xl">
        {certificationsData?.title || "Certifications"}
      </h1>

      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-3/4 mt-12 min-h-[80vh] lg:max-h-[40vh] text-center'>
        {certificationsData?.certificationsList?.map((cert, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className='flex flex-col items-center justify-center rounded-3xl bg-gray-50 border p-4 min-h-[40vh] lg:max-h-[20vh] hover:bg-gray-100 transition-all'
            >
              {cert.pdfImage && (
                <Image
                  src={urlFor(cert.pdfImage).url()}
                  alt={cert.name}
                  className="w-full h-32 object-contain mb-4"
                />
              )}
              <p className="font-medium text-gray-800">{cert.name}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
