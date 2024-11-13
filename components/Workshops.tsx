"use client";
// import { fetcher } from "@/fetcher";
import { Project } from "@/typings";
import { urlFor } from "@/utils/imageUrlConvertor";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Workshops() {
  // const projects = [1, 2, 3, 4, 5];
  const [projects, setprojects] = useState<Array<Project>>();

  useEffect(() => {
    setprojects([{
      "title": "Portfolio",
      "image": {
        "hotspot": {
          "_type": "sanity.imageHotspot",
          "width": 0.976027397260274,
          "x": 0.488013698630137,
          "y": 0.5534246575342466,
          "height": 0.8931506849315068
        },
        "_type": "image",
        "asset": {
          "_ref": "image-11032bcb022fba165fab2eac6ce12b8c1f037576-3584x2240-png",
          "_type": "reference"
        },
        "crop": {
          "right": 0.023972602739726012,
          "top": 0.1068493150684932,
          "left": 0,
          "bottom": 0,
          "_type": "sanity.imageCrop"
        }
      },
      "linkToBuild": "https://next-portfolio-blond-eight.vercel.app",
      "_type": "project",
      "summary": "A Portfolio created using latest NextJs...",
      "_id": "project-1",
      "_createdAt": new Date().toISOString(),
      "_updatedAt": new Date().toISOString(),
      "_rev": "1",
      "technologies": []
    },
    {
      "title": "Portfolio",
      "image": {
        "hotspot": {
          "_type": "sanity.imageHotspot",
          "width": 0.976027397260274,
          "x": 0.488013698630137,
          "y": 0.5534246575342466,
          "height": 0.8931506849315068
        },
        "_type": "image",
        "asset": {
          "_ref": "image-11032bcb022fba165fab2eac6ce12b8c1f037576-3584x2240-png",
          "_type": "reference"
        },
        "crop": {
          "right": 0.023972602739726012,
          "top": 0.1068493150684932,
          "left": 0,
          "bottom": 0,
          "_type": "sanity.imageCrop"
        }
      },
      "linkToBuild": "https://next-portfolio-blond-eight.vercel.app",
      "_type": "project",
      "summary": "A Portfolio created using latest NextJs...",
      "_id": "project-2",
      "_createdAt": new Date().toISOString(),
      "_updatedAt": new Date().toISOString(),
      "_rev": "2",
      "technologies": []
    }
    ])
  }, []);



  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen mx-auto items-center overflow-hidden
                    max-w-full md:flex-row  px-10 justify-evenly text-left z-0 "
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Workshops
      </h3>

      <div className=" relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
        {projects &&
          projects.map((project, i) => (
            <div
              key={i}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-20 h-screen"
            >
              {project && project.image && (
                <motion.img
                  className="md:h-60 md:w-100 xl:mt-20 xl:w-[700px] xl:h-[400px] "
                  initial={{ y: -100, opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src={urlFor(project.image).url()}
                  alt="No Image"
                />
              )}

              <div className="space-y-10 px-0 md:px-10 w-80 overflow-x-hidden h-80 md:w-auto md:h-auto">
                <h4 className="text-4xl font-semibold text-center">
                  <span className="underline decoration-[#F7AB0A]/50">
                    {project.title}
                  </span>{" "}
                  <a
                    className="text-[rgb(107,150,242)]"
                    href={project.linkToBuild}
                    target="_blank"
                  >
                    {project.linkToBuild}
                  </a>
                </h4>
                <p className="text-lg text-center md:text-left mb-0 h-60 md:h-auto">
                  {project.summary}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
