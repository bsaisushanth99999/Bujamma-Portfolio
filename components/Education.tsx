'use client';

import img1 from "@/photos/biit.jpg"
import img2 from "@/photos/cornell.png"
import img3 from "@/photos/bashyam.jpg"
import img4 from "@/photos/maharaja.jpg"
import img5 from "@/photos/main-picture.jpeg"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import Xarrow from 'react-xarrows';

export default function Education() {
    // Create refs individually
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const box4Ref = useRef(null);

    // Create refs array with only the active refs
    const refs = [box4Ref, box2Ref, box3Ref];

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getImageSize = () => {
        if (windowWidth >= 1280) return 100; // xl
        if (windowWidth >= 1024) return 90;  // lg
        if (windowWidth >= 768) return 80;   // md - iPad
        return 60;                           // iPad mini and smaller
    };

    const imageSize = getImageSize();

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center">
                <div className="relative">
                    <h1 className="uppercase tracking-[20px] text-gray-500 text-2xl mt-12">
                        Education
                    </h1>
                </div>
            </div>

            <div className="flex-1 relative">
                {/* <div className="absolute top-16 left-1/3 transform -translate-x-1/2">
                    <Image id="4" src={img5} alt="Image 5" width={imageSize} height={imageSize} className="rounded-full" />
                    <p>Bashyam High School</p>
                </div> */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <Image ref={box3Ref} id="2" src={img4} alt="Image 4" width={imageSize} height={imageSize} className="rounded-full mx-auto" />
                    <p>Maharajah&apos;s Institute of Medical Sciences</p>
                </div>
                {/* <div className="absolute bottom-16 left-2/3 transform -translate-x-1/2 text-center">
                    <Image ref={box1Ref} src={img3} alt="Image 3" width={imageSize} height={imageSize} className="rounded-full ml-auto" />
                    <p>Bashyam High School</p>
                </div> */}
                <div className="absolute left-32 top-1/3 transform -translate-y-1/2 text-center">
                    <Image id="3" src={img2} alt="Image 2" width={200} height={imageSize} className="rounded-full mx-auto" />
                    <p>Cornell University</p>
                </div>
                <div className="absolute right-32 top-2/3 transform -translate-y-1/2 text-center">
                    <Image ref={box2Ref} src={img1} alt="Image 1" width={imageSize} height={imageSize} className="rounded-full mx-auto" />
                    <p>Bashyam IIT Junior college</p>
                </div>

                {refs.map((ref, index) => (
                    <span key={index} className="animate-pulse relative max-h-screen">
                        <Xarrow
                            start={ref}
                            end={(index + 1).toString()}
                            color="red"
                            strokeWidth={2}
                            // startAnchor={index == 3 ? "top" : "auto"}
                            // endAnchor={index == 0 ? "bottom" : "auto"}
                            animateDrawing={2}
                            labels={index == 1
                                ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>2 years</div> }
                                : index == 2
                                    ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>4 years</div> }
                                    : ""}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}
