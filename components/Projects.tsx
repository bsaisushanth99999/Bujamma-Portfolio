'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/schemas/project';
import { fetcher } from '@/fetcher';
import LoadingSpinner from './LoadingSpinner';

interface SanityFile {
    _type: "file";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const getPdfUrl = (pdfDocument: SanityFile | undefined): string | undefined => {
        if (!pdfDocument?.asset?._ref) return undefined;
        const [, id, extension] = pdfDocument.asset._ref.split('-');
        return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;
    };

    const getVideoUrl = (videoDocument: SanityFile | undefined): string | undefined => {
        if (!videoDocument?.asset?._ref) return undefined;
        const [, id, extension] = videoDocument.asset._ref.split('-');
        return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await fetcher<Project[]>('/api/getProjects');
                // Sort projects to ensure Capstone Project is first
                const sortedProjects = data.sort((a, b) => {
                    if (a.title === "Capstone Project") return -1;
                    if (b.title === "Capstone Project") return 1;
                    return 0;
                });
                setProjects(sortedProjects);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const MediaSection = ({ project }: { project: Project }) => {
        const videoUrl = project.video ? getVideoUrl(project.video) : null;

        const isPublicHealthComm = project.title.trim() === "Public Health Communication";

        return (
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="mt-40 md:mt-0 flex-shrink-0 md:w-1/2 flex flex-col items-center justify-center"
            >
                {isPublicHealthComm && videoUrl ? (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative w-[500px] h-[300px] bg-white rounded-lg shadow-lg overflow-hidden group"
                    >
                        <video
                            key={videoUrl}
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                        />
                        <div
                            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedVideo(videoUrl)}
                        />
                    </motion.div>
                ) : project.pdfDocuments && project.pdfDocuments.length > 0 ? (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {project.pdfDocuments.map((pdf, index) => {
                            const pdfUrl = getPdfUrl(pdf);
                            if (!pdfUrl) return null;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ y: -100, opacity: 0 }}
                                    transition={{ duration: 1.2 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative w-[500px] h-[300px] bg-white rounded-lg shadow-lg overflow-hidden group"
                                >
                                    <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                                        <iframe
                                            src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                                            className="w-full min-h-[1000px]"
                                            title="PDF Preview"
                                            style={{ height: '1000px' }}
                                        />
                                    </div>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 cursor-pointer"
                                        onClick={() => setSelectedPdf(pdfUrl)}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-[500px] h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No media available</p>
                    </div>
                )}
            </motion.div>
        );
    };

    const ContentSection = ({ project }: { project: Project }) => (
        <div className="space-y-10 px-0 md:px-10 md:w-1/2">
            <h4 className="text-4xl font-semibold">
                <span className="underline decoration-[#F7AB0A]">
                    {project.title}
                </span>
            </h4>
            <p className="text-lg">
                {project.summary}
            </p>
            {project.linkToBuild && (
                <a
                    href={project.linkToBuild}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#F7AB0A] py-3 px-6 rounded-md text-black font-bold text-lg hover:bg-[#F7AB0A]/80 transition-colors"
                >
                    View Project
                </a>
            )}
        </div>
    );

    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
            {projects?.map((project, i) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center snap-center relative"
                >
                    <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl z-10">
                        Project {i + 1} of {projects.length}
                    </h3>

                    {i % 2 === 0 ? (
                        <>
                            <MediaSection project={project} />
                            <ContentSection project={project} />
                        </>
                    ) : (
                        <>
                            <ContentSection project={project} />
                            <MediaSection project={project} />
                        </>
                    )}
                </motion.div>
            ))}

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

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <video
                            src={selectedVideo}
                            className="w-full h-full rounded-lg"
                            controls
                            autoPlay
                        />
                    </div>
                </div>
            )}
        </div>
    );
} 