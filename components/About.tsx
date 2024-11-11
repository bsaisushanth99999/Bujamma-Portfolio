"use client";
import { fetcher } from "@/fetcher";
import { urlFor } from "@/utils/imageUrlConvertor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageInfo } from "@/typings";
import img1 from "@/photos/img1.jpeg"

export default function About() {
  const [pageInfoData, setPageInfoData] = useState<PageInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await fetcher<any>("/api/getPageInfo");
        setPageInfoData({
            "phoneNumber": "+(91)-7348820528",
            "_createdAt": "2023-05-07T07:48:26Z",
            "socials": [
                {
                    "_key": "fd5ab5e7bbd5",
                    "_ref": "379d1dbe-9b05-481c-9fd0-d671d097dafd",
                    "_type": "reference"
                },
                {
                    "_ref": "4dd556ca-f0ad-42f2-acbf-2e81ce8e77a2",
                    "_type": "reference",
                    "_key": "b129b3cc731e"
                },
                {
                    "_key": "726f7cd2d31b",
                    "_ref": "5324684a-efb4-426b-bc63-de2698cee87d",
                    "_type": "reference"
                }
            ],
            "backgroundInformation": "Hi, I love coding on my weekend's as a hobby. I have 4+ years of experience in Full-Stack development and keen eye for new technologies such as this \"Next Js\", in which this project is designed. I have almost 5 projects linked to my name all responsive, all with something new in them like ChatGPT inclusion in my projects.",
            "address": "WhiteField, Banglore",
            "_rev": "TDRd8OoYojtwmEJ58jDWWe",
            "_type": "PageInfo",
            "heroImage": {
                "_type": "image",
                "asset": {
                    "_ref": "image-be375a4fc00c68922ee941402c55ad9f363967df-400x267-png",
                    "_type": "reference"
                }
            },
            "_updatedAt": "2024-06-02T23:46:17Z",
            "profilePic": {
                "_type": "image",
                "asset": {
                    "_ref": "image-48730cfb499b9f32fab6f319e7c85871b2896489-5760x3840-jpg",
                    "_type": "reference"
                }
            },
            "name": "Bynagari Sai Sushanth Reddy",
            "_id": "0b06c559-dfe1-4cf8-a040-b1e4a782a8b4",
            "email": "Bsaisushanth@gmail.com"
        });
      } catch (error) {
        console.log("ERROR");
      }
    };

    fetchData();
  }, []);

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
      {pageInfoData && pageInfoData.profilePic && (
        <motion.img
          className="mt-40 md:mt-0 md:mb-0 flex-shrink-0 rounded-full w-56 h-56 object-cover md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[500px]"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          src={img1}//{urlFor(pageInfoData.heroImage).url()}
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
