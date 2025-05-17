'use client';

import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import { useContext, useEffect, useRef, useState } from "react";
import { ToneServiceContext } from "../ToneServiceContext";
import InstrumentSelect from "./InstrumentSelect";
import BeatOverlay from "./BeatOverlay";

const DynamicToneServiceContextProvider = dynamic(() => import("../ToneServiceContext"), {
    ssr: false
})

const DynamicBeat = dynamic(() => import("./Beat"), {
    ssr: false
})

const DynamicOctaveSelect = dynamic(() => import("./OctaveSelect"), {
    ssr: false
});

export interface UiState{
    octave: number,
    scale: string[],
    sequence: (string | null)[]
}

export default function Board(){
    
    const beats = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    const { toneService } = useContext(ToneServiceContext);
    
    const [uiState, setUiState] = useState({
        octave: toneService.octave,
        sequence: toneService.sequence,
        scale: toneService.scale
    })

    useEffect(()=> {
        toneService.updateBeatOverlay()
    }, [])

    function togglePlay(){
        toneService.togglePlay();
    }

    return (
        <div className="flex border-black border-[2px] border-solid rounded-xl shadow-md pr-[20px]" style={{userSelect: "none"}}>
            <DynamicToneServiceContextProvider contextValue={toneService}>
            <div className="flex relative">
                <BeatOverlay width={0} />
                {beats.map(b => <DynamicBeat key={uuid()} count={b} scale={uiState.scale} sequence={uiState.sequence} setUiState={setUiState} />)}
                <div className='flex flex-col'>
                    <DynamicOctaveSelect setUiState={setUiState}/>
                    <InstrumentSelect />
                </div>
                <button className="btn btn-success" onClick={togglePlay}>play/pause</button>
            </div>
            </DynamicToneServiceContextProvider>
        </div>
    )
}