'use client'

import { fetcher } from "@/fetcher";
import { urlFor } from "@/utils/imageUrlConvertor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CertificationsData } from "@/typings";
import Image from "next/image";

interface SanityFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export default function Certifications() {
  const [certificationsData, setCertificationsData] = useState<CertificationsData | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const getPdfUrl = (pdfDocument: SanityFile | undefined): string | undefined => {
    if (!pdfDocument?.asset?._ref) return undefined;
    const [, id, extension] = pdfDocument.asset._ref.split('-');
    return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher<CertificationsData>("/api/getCertifications");
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

      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-3/4 mt-12 min-h-[80vh] lg:max-h-[40vh] text-center'>
        {certificationsData?.certificationsList?.map((cert, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className='flex flex-col items-center justify-center rounded-3xl bg-gray-50 border p-4 min-h-[40vh] lg:max-h-[20vh] hover:bg-gray-100 transition-all cursor-pointer'
              onClick={() => {
                const pdfUrl = getPdfUrl(cert.pdfDocument);
                if (pdfUrl) setSelectedPdf(pdfUrl);
              }}
            >
              {cert.pdfImage && (
                <Image
                  src={urlFor(cert.pdfImage).url()}
                  alt={cert.name}
                  width={100}
                  height={100}
                  className="w-full h-32 object-contain mb-4"
                />
              )}
              <p className="font-medium text-gray-800">{cert.name}</p>
            </motion.div>
          );
        })}
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
    </div>
  );
}
