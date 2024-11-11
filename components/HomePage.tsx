'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Xarrow from 'react-xarrows';
import img1 from '@/photos/img1.jpeg';
import img2 from '@/photos/img2.jpeg';
import img3 from '@/photos/img3.jpeg';
import img4 from '@/photos/img4.jpeg';
import img5 from '@/photos/img5.jpeg';
import img6 from '@/photos/img6.jpeg';
import img7 from '@/photos/img7.jpeg';
import img8 from '@/photos/img8.jpeg';
import img9 from '@/photos/img8.jpeg'; // Additional images
import img10 from '@/photos/img2.jpeg';
import img11 from '@/photos/img2.jpeg';
import img12 from '@/photos/img2.jpeg';
import mainPicture from '@/photos/main-picture.jpeg';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const additionalImages = [img10, img11, img12]; // Three additional images

  const imageMapper: { [key: number]: string } = {
    0: "/education",
    1: "/skills",
    2: "/hobbies",
    3: "/languages",
    4: "/workshops",
    5: "/experience",
    6: "/certifications",
    7: "/about",
    8: "/contact"
  };
  const additionalImageMapper: { [key: number]: string } = {
    0: "/mbbs",
    1: "/volenter",
    2: "/mphProject",
  };

  const angleIncrement = 360 / images.length;
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  // State to manage hover over "experience"
  const [isHoveringExperience, setIsHoveringExperience] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Main picture */}
      <div ref={box1Ref} className="rounded-full">
        <Image src={mainPicture} alt="Main Picture" width={100} height={100} className="rounded-full" />
      </div>

      {/* Surrounding pictures */}
      {images.map((src, index) => {
        const angle = angleIncrement * index;

        return (
          <div
            id={index.toString()}
            key={index}
            className="group absolute rounded-full"
            style={{
              transform: `rotate(${angle}deg) translateX(350px) rotate(-${angle}deg)`,
            }}
            onClick={() => {
              if (index === 5) setIsHoveringExperience(!isHoveringExperience); // Index 6 is for "experience"
            }}
          >
            <Image
              src={src}
              ref={index === 5 ? box2Ref : null}
              alt={`Picture ${index + 1}`}
              width={80}
              height={80}
              className={index === 5 && isHoveringExperience ? "rounded-full cursor-pointer hover:grayscale" : "rounded-full cursor-pointer hover:grayscale animate-pulse"}
              onClick={() => { index !== 5 && router.push(imageMapper[index]) }}
            />
            <span className="animate-pulse relative max-h-screen">
              <Xarrow
                start={box1Ref}
                end={index.toString()}
                color="gold"
                strokeWidth={2}
                dashness={true}
                animateDrawing={true}
                zIndex={index}
              />
            </span>
            <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-24 w-24 md:w-28 md:h-28 xl:w-36 xl:h-16 rounded-3xl">
              <div className="flex items-center justify-center h-full">
                <p className="text-1xl text-black opacity-100">{imageMapper[index].replace("/", "").toUpperCase()}</p>
              </div>
            </div>

            {/* Conditional rendering for additional images */}
            {isHoveringExperience && index === 5 && additionalImages.map((img, i) => {
              const additionalAngle = angle + (i - 1) * 45; // Adjust angles for the 3 additional images
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `rotate(${additionalAngle}deg) translateX(300px) rotate(-${additionalAngle}deg)`,
                  }}
                >
                  <Image id={(i + 10).toString()} src={img} alt={`Additional Image ${i + 1}`} width={80} height={80}
                    className="rounded-full animate-pulse cursor-pointer hover:grayscale"
                    onClick={() => { router.push(additionalImageMapper[i]) }}
                  />

                  <span className="animate-pulse relative max-h-screen">
                    <Xarrow
                      start={box2Ref}
                      end={(i + 10).toString()}
                      color="gold"
                      startAnchor={i == 0 ? "bottom" : i == 1 ? "auto" : "top"}
                      endAnchor={i == 0 ? "top" : "right"}
                      strokeWidth={2}
                      dashness={true}
                      animateDrawing={true}
                      zIndex={i}
                    />
                  </span>
                  <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-24 w-24 md:w-28 md:h-28 xl:w-36 xl:h-16 rounded-3xl">
                    <div className="flex items-center justify-center h-full">
                      <p className="text-1xl text-black opacity-100">{additionalImageMapper[i].replace("/", "").toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
