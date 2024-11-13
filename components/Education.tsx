'use client';

import img1 from "@/photos/img1.jpeg"
import img2 from "@/photos/img6.jpeg"
import img3 from "@/photos/img3.jpeg"
import img4 from "@/photos/img4.jpeg"
import img5 from "@/photos/main-picture.jpeg"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import Xarrow from 'react-xarrows';

export default function Education() {
    // Create refs individually
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const box4Ref = useRef(null);

    // Create refs array after declaring them
    const refs = [box1Ref, box2Ref, box3Ref, box4Ref];

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
                <div id="4" className="absolute top-16 left-1/3 transform -translate-x-1/2">
                    <Image src={img5} alt="Image 5" width={imageSize} height={imageSize} className="rounded-full" />
                </div>
                <div ref={box3Ref} id="2" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Image src={img4} alt="Image 4" width={imageSize} height={imageSize} className="rounded-full" />
                </div>
                <div ref={box1Ref} className="absolute bottom-16 left-2/3 transform -translate-x-1/2">
                    <Image src={img3} alt="Image 3" width={imageSize} height={imageSize} className="rounded-full" />
                </div>
                <div ref={box4Ref} id="3" className="absolute left-32 top-1/3 transform -translate-y-1/2">
                    <Image src={img2} alt="Image 2" width={imageSize} height={imageSize} className="rounded-full" />
                </div>
                <div ref={box2Ref} id="1" className="absolute right-32 top-2/3 transform -translate-y-1/2">
                    <Image src={img1} alt="Image 1" width={imageSize} height={imageSize} className="rounded-full" />
                </div>

                {refs.map((ref, index) => (
                    <span key={index} className="animate-pulse relative max-h-screen">
                        <Xarrow
                            start={ref}
                            end={(index + 1).toString()}
                            color="red"
                            strokeWidth={2}
                            animateDrawing={true}
                            labels={index == 0
                                ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>10 years</div> }
                                : index == 1
                                    ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>2 years</div> }
                                    : index == 2
                                        ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>4 years</div> }
                                        : index == 3
                                            ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>5 years</div> }
                                            : ""}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}
