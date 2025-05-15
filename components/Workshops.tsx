"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { urlFor } from "@/utils/imageUrlConvertor";
import { fetcher } from "@/fetcher";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Workshop } from "@/typings";
import Image from "next/image";

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const getPdfUrl = (pdfDocument: Workshop['pdfDocument']) => {
    if (!pdfDocument?.asset?._ref) return null;
    const [, id, extension] = pdfDocument.asset._ref.split('-');
    return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;
  };

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
        {workshops && workshops.map((workshop) => (
          <div
            key={workshop._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-20 h-screen"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {workshop.image && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-[500px] h-[300px]"
                >
                  <Image
                    src={urlFor(workshop.image).url()}
                    alt={workshop.title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              )}

              {workshop.pdfDocument && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-[500px] h-[300px] bg-white rounded-lg shadow-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    <iframe
                      src={`${getPdfUrl(workshop.pdfDocument)}#toolbar=0&navpanes=0&view=FitH`}
                      className="w-full min-h-[1000px]"
                      title="PDF Preview"
                      style={{ height: '1000px' }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      const pdfUrl = getPdfUrl(workshop.pdfDocument);
                      if (pdfUrl) setSelectedPdf(pdfUrl);
                    }}
                  />
                </motion.div>
              )}
            </div>

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

      {/* PDF Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={`${selectedPdf}#toolbar=0`}
              className="w-full h-full rounded-lg"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}

      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
}
