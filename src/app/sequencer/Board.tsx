'use client';

import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { ToneServiceContext } from "../ToneServiceContext";
import InstrumentSelect from "./InstrumentSelect";
import BeatOverlay from "./BeatOverlay";

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

    function stopClear(){
        toneService.stopClear();
        setUiState({
            octave: toneService.octave,
            sequence: toneService.sequence,
            scale: toneService.scale
        })
    }

    return (
        <div className="border-black border-[2px] border-solid rounded-xl shadow-md pr-[20px] mb-[20px]" style={{userSelect: "none"}}>
            <div className="flex relative">
                <BeatOverlay />
                {uiState.sequence.map((n, i) => <DynamicBeat key={uuid()} count={i} scale={uiState.scale} sequence={uiState.sequence} setUiState={setUiState} />)}
                <div className='flex flex-col'>
                    <DynamicOctaveSelect setUiState={setUiState}/>
                    <InstrumentSelect />
                </div>
                <div className="flex flex-col">
                    <button className="btn btn-success" onClick={togglePlay}>play/pause</button>
                    <button className="btn btn-error" onClick={stopClear}>stop/clear</button>
                </div>
            </div>
        </div>
    )
}