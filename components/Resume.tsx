'use client';

import { fetcher } from "@/fetcher";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Resume } from "@/schemas/resume";
import LoadingSpinner from './LoadingSpinner';

interface SanityFile {
    _type: "file";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export default function Resume() {
    const [resumeData, setResumeData] = useState<Resume>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const timestamp = new Date().getTime();
            const data = await fetcher<Resume>(`/api/getResume?t=${timestamp}`);
            setResumeData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching Resume:", error);
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

    const getPdfUrl = (pdfDocument: SanityFile | undefined): string | undefined => {
        if (!pdfDocument?.asset?._ref) return undefined;
        const [, id, extension] = pdfDocument.asset._ref.split('-');
        return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;
    };

    const handleDownload = () => {
        const pdfUrl = getPdfUrl(resumeData?.pdfDocument);
        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        }
    };

    if (isLoading || !resumeData) {
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
                RESUME
            </h3>

            <div className="space-y-10 px-0 md:px-10 md:w-1/2">
                <h4 className="text-4xl font-semibold">
                    Keep my{" "}
                    <span className="underline decoration-[#F7AB0A]">Resume</span>{" "}
                    handy

                </h4>
                <p className="text-base">
                    {resumeData?.summary}
                </p>
            </div>

            {resumeData?.pdfDocument && (
                <motion.div
                    className="mt-40 md:mt-0 md:mb-0 flex-shrink-0 md:w-1/2"
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                >
                    <div className="relative w-full h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
                        <iframe
                            src={`${getPdfUrl(resumeData.pdfDocument)}#toolbar=0`}
                            className="w-full h-full"
                            title="Resume PDF"
                        />
                        <button
                            onClick={handleDownload}
                            className="absolute bottom-4 right-4 bg-[#F7AB0A] text-white px-4 py-2 rounded-md hover:bg-[#F7AB0A]/80 transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download PDF
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
