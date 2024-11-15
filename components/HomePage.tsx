'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Xarrow from 'react-xarrows';
import { useRouter } from 'next/navigation';
import mainPicture from '@/photos/main-picture.jpeg';
import img1 from '@/photos/img1.jpeg';
import img2 from '@/photos/img2.jpeg';
import img3 from '@/photos/img3.jpeg';
import img4 from '@/photos/img4.jpeg';
import img5 from '@/photos/img5.jpeg';
import img6 from '@/photos/img6.jpeg';
import img7 from '@/photos/img7.jpeg';
import img8 from '@/photos/img8.jpeg';
import img9 from '@/photos/img4.jpeg';
import img10 from '@/photos/img1.jpeg';
import img11 from '@/photos/img2.jpeg';
import img12 from '@/photos/img3.jpeg';

export default function HomePage() {
  const router = useRouter();
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const additionalImages = [img10, img11, img12];
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const [isHoveringExperience, setIsHoveringExperience] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

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

  // Handle window resize and initial width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getConfig = () => {
    if (windowWidth >= 1280) { // xl - Large Desktop
      return {
        mainRadius: 300,
        mainImageSize: 80,
        expRadius: 150,
        expImageSize: 60,
        expAngleSpread: 60
      };
    }
    if (windowWidth >= 1024) { // lg - Desktop
      return {
        mainRadius: 250,
        mainImageSize: 70,
        expRadius: 130,
        expImageSize: 50,
        expAngleSpread: 60
      };
    }
    if (windowWidth >= 768) { // md - iPad
      return {
        mainRadius: 200,
        mainImageSize: 60,
        expRadius: 100,
        expImageSize: 40,
        expAngleSpread: 60
      };
    }
    // iPad mini and smaller screens (default)
    return {
      mainRadius: 160,
      mainImageSize: 50,
      expRadius: 80,
      expImageSize: 35,
      expAngleSpread: 45
    };
  };

  const config = getConfig();

  // Add a loading state
  if (windowWidth === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#1F2937]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // Common image wrapper styles
  const imageWrapperStyles = "relative overflow-hidden flex items-center justify-center";
  const imageStyles = "object-cover w-full h-full rounded-full hover:grayscale transition-all duration-300";

  const handleNavigation = (path: string) => {
    // Use Next.js router prefetch to speed up navigation
    router.prefetch(path);
    router.push(path);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1F2937]">
      {/* Main center image */}
      <div
        ref={box1Ref}
        className={`absolute z-10 ${imageWrapperStyles}`}
        style={{
          width: `${config.mainImageSize * 1.2}px`,
          height: `${config.mainImageSize * 1.2}px`,
        }}
      >
        <Image
          src={mainPicture}
          alt="Main Picture"
          fill
          className={imageStyles}
        />
      </div>

      {/* Main circle of images */}
      {images.map((src, index) => {
        const angle = angleIncrement * index;
        const radian = (angle * Math.PI) / 180;
        const x = config.mainRadius * Math.cos(radian);
        const y = config.mainRadius * Math.sin(radian);

        return (
          <div
            key={index}
            id={index.toString()}
            className={`absolute ${index === 5 ? 'z-20' : 'z-0'}`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div className="group relative">
              {/* Image wrapper for perfect circle */}
              <div
                className={imageWrapperStyles}
                style={{
                  width: `${config.mainImageSize}px`,
                  height: `${config.mainImageSize}px`,
                }}
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className={`${imageStyles} cursor-pointer
                    ${index === 5 ? 'hover:ring-2 hover:ring-yellow-400' : ''} 
                    ${index === 5 && isHoveringExperience ? '' : 'animate-pulse'}`}
                  ref={index === 5 ? box2Ref : null}
                  onClick={() => {
                    if (index === 5) {
                      setIsHoveringExperience(!isHoveringExperience);
                    } else {
                      handleNavigation(imageMapper[index]);
                    }
                  }}
                />
              </div>

              {/* Main circle arrows */}
              <Xarrow
                start={box1Ref}
                end={index.toString()}
                color="gold"
                strokeWidth={1}
                dashness={true}
                animateDrawing={1}
                headSize={3}
                path="smooth"
              />

              {/* Main circle hover text */}
              <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 
                            ease-in-out group-hover:bg-white rounded-xl px-2 py-1 left-1/2 
                            -translate-x-1/2 mt-2 z-30">
                <p className="text-xs md:text-sm text-black whitespace-nowrap">
                  {imageMapper[index].replace("/", "").toUpperCase()}
                </p>
              </div>

              {/* Experience additional images with fixed hover effect */}
              {isHoveringExperience && index === 5 && (
                <>
                  {additionalImages.map((img, i) => {
                    const baseAngle = angle - config.expAngleSpread;
                    const expAngle = baseAngle + (i * config.expAngleSpread);
                    const expRadian = (expAngle * Math.PI) / 180;
                    const expX = config.expRadius * Math.cos(expRadian);
                    const expY = config.expRadius * Math.sin(expRadian);

                    return (
                      <div
                        key={`exp-${i}`}
                        id={`exp-${i}`}
                        className="absolute z-30"
                        style={{
                          transform: `translate(${expX}px, ${expY}px)`,
                        }}
                      >
                        {/* Individual group for each experience item */}
                        <div className="group/exp relative">
                          <div
                            className={imageWrapperStyles}
                            style={{
                              width: `${config.expImageSize}px`,
                              height: `${config.expImageSize}px`,
                            }}
                          >
                            <Image
                              src={img}
                              alt={`Experience ${i + 1}`}
                              fill
                              className={`
                                object-cover w-full h-full rounded-full 
                                cursor-pointer animate-pulse
                                transition-all duration-300
                                group-hover/exp:grayscale
                              `}
                              onClick={() => handleNavigation(additionalImageMapper[i])}
                            />
                          </div>

                          <Xarrow
                            start={box2Ref}
                            end={`exp-${i}`}
                            color="gold"
                            strokeWidth={1}
                            dashness={true}
                            animateDrawing={1}
                            headSize={3}
                            path="smooth"
                          />

                          {/* Individual hover text for each experience item */}
                          <div className="absolute opacity-0 group-hover/exp:opacity-80 
                                        transition duration-300 ease-in-out 
                                        group-hover/exp:bg-white rounded-xl px-2 py-1 
                                        left-1/2 -translate-x-1/2 mt-2">
                            <p className="text-xs md:text-sm text-black whitespace-nowrap">
                              {additionalImageMapper[i].replace("/", "").toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
