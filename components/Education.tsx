'use client';

import img1 from "@/photos/biit.jpg"
import img2 from "@/photos/cornell.png"
import img4 from "@/photos/maharaja.jpg"
import Image from "next/image"
import { useRef } from "react"
import Xarrow from 'react-xarrows';

export default function Education() {
    // Create refs individually
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const box4Ref = useRef(null);

    // Create refs array with only the active refs
    const refs = [box4Ref, box2Ref, box3Ref];

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
                    <Image id="4" src={img5} alt="Image 5" width={100} height={100} className="rounded-full" />
                    <p>Bashyam High School</p>
                </div> */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center hover:scale-150 [transition:all_.3s]">
                    <Image ref={box3Ref} id="2" src={img4} alt="Image 4" width={100} height={100} className="rounded-full mx-auto" />
                    <p>Maharajah&apos;s Institute of Medical Sciences</p>
                    <p>Andhra Pradesh, India</p>
                    <p>MBBS | 2022</p>
                </div>
                {/* <div className="absolute bottom-16 left-2/3 transform -translate-x-1/2 text-center">
                    <Image ref={box1Ref} src={img3} alt="Image 3" width={100} height={100} className="rounded-full ml-auto" />
                    <p>Bashyam High School</p>
                </div> */}
                <div className="absolute left-32 top-2/3 transform -translate-y-1/2 text-center hover:scale-150 [transition:all_.3s]">
                    <Image ref={box2Ref} src={img1} alt="Image 1" width={100} height={100} className="rounded-full mx-auto" />
                    <p>Bashyam IIT Junior college</p>
                    <p>Andhra Pradesh, India</p>
                    <p>BiPC | 2015</p>

                </div>
                <div className="absolute right-32 top-1/3 transform -translate-y-1/2 text-center hover:scale-150 [transition:all_.3s]">
                    <Image id="3" src={img2} alt="Image 2" width={200} height={100} className="rounded-full mx-auto" />
                    <p>Cornell University</p>
                    <p>New York, USA</p>
                    <p>MPH | 2025</p>
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
                        // labels={index == 1
                        //     ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>5.5 years</div> }
                        //     : index == 2
                        //         ? { "middle": <div style={{ fontSize: "1.3em", fontFamily: "fantasy", fontStyle: "italic" }}>2 years</div> }
                        //         : ""}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}
