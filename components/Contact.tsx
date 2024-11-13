"use client";

import { PageInfo } from "@/typings";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as icons from "react-icons/fa";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [pageInfoData, setPageInfoData] = useState<PageInfo | undefined>();

  useEffect(() => {
    setPageInfoData({
      "_id": "0b06c559-dfe1-4cf8-a040-b1e4a782a8b4",
      "socials": [
        {
          "_type": "reference",
          "_key": "fd5ab5e7bbd5",
          "_ref": "379d1dbe-9b05-481c-9fd0-d671d097dafd"
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
      "_updatedAt": "2024-06-02T23:46:17Z",
      "address": "WhiteField, Banglore",
      "_rev": "TDRd8OoYojtwmEJ58jDWWe",
      "phoneNumber": "+(91)-8897087962",
      "_createdAt": "2023-05-07T07:48:26Z",
      "name": "Bynagari Tejaswini Reddy",
      "email": "Tejaswini2811@gmail.com",
      "backgroundInformation": "Hi, I love coding on my weekend's as a hobby. I have 4+ years of experience in Full-Stack development and keen eye for new technologies such as this \"Next Js\", in which this project is designed. I have almost 5 projects linked to my name all responsive, all with something new in them like ChatGPT inclusion in my projects.",
      "_type": "PageInfo",
      "heroImage": {
        "_type": "image",
        "asset": {
          "_ref": "image-placeholder",
          "_type": "reference"
        }
      },
      "profilePic": {
        "_type": "image",
        "asset": {
          "_ref": "image-placeholder",
          "_type": "reference"
        }
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    window.location.href = `mailto:tejaswini2811@gmail.com?subject=${formData.subject}&body=HI, My name is : ${formData.name}.\n ${formData.message}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="space-y-20 flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact
      </h3>

      <div className="flex flex-col space-y-10">
        {/* w-screen Add this to fit for mobile screens */}
        <h4 className="text-4xl text-semibold text-center ">
          I got what you need.{" "}
          <span className="decoration-[#F7AB0A]/50 underline">Lets Talk</span>{" "}
        </h4>
        <div className="space-y-10">
          <div className="flex items-center space-x-5 justify-center">
            <icons.FaPhoneAlt className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">
              {pageInfoData && pageInfoData.phoneNumber}
            </p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <icons.FaEnvelope className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">{pageInfoData && pageInfoData.email}</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <icons.FaMapMarked className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">{pageInfoData && pageInfoData.address}</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 mx-auto w-fit"
          >
            <div className="flex space-x-2">
              <input
                {...register("name")}
                type="text"
                className="contactInput"
                placeholder="Name"
              />
              <input
                {...register("email")}
                type="email"
                className="contactInput"
                placeholder="Email"
              />
            </div>
            <input
              {...register("subject")}
              type="text"
              className="contactInput"
              placeholder="Subject"
            />
            <textarea
              {...register("message")}
              className="contactInput"
              placeholder="Message"
            />
            <button
              type="submit"
              className="bg-[#F7AB0A] px-10 py-5 rounded-md text-black font-bold text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
