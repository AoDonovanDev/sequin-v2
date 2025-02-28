'use client';

import Beat from "./Beat";
import { v4 as uuid } from 'uuid';
import scalePicker from "../util/scalePicker";
import OctaveSelect from "./OctaveSelect";
import { useState, useContext } from "react";
import dynamic from "next/dynamic";

const DynamicToneServiceContextProvider = dynamic(() => import("../ToneServiceContext"), {
    ssr: false
})

export default function Board(){

   
    const beats = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    const [octave, setOctave] = useState(1);
    const scale = scalePicker(octave, "major");
    

    return (
        <div className="flex border-black border-[2px] border-solid rounded-xl shadow-md" style={{userSelect: "none"}}>
            <DynamicToneServiceContextProvider>
            <>
                {beats.map(b => <Beat key={uuid()} count={b} scale={scale}/>)}
                <OctaveSelect setOctave={setOctave}/>
            </>
            </DynamicToneServiceContextProvider>
        </div>
    )
}