'use client';

import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { useContext } from "react";
import { ToneServiceContext } from "../ToneServiceContext";
import { UiState } from "./Board";


export default function SequencerNode( { note, active, count, scaleIndex, setUiState } : {
    note: string, 
    active: boolean,
    count: number,
    scaleIndex: number,
    setUiState: Dispatch<SetStateAction<UiState>>  
}){

    const [isHovered, setIsHovered] = useState(false);

    const { toneService } = useContext(ToneServiceContext);

    function handleMouseOver(e: SyntheticEvent){
        if(active) return;
        setIsHovered(true);
    }

    function handleMouseLeave(e: SyntheticEvent){
        setIsHovered(false);
    }    

    function handleNodeClick(){
        toneService.updateSequenceAtIndex(note, scaleIndex, count);
        toneService.playSequence();
        const { octave, sequence, scale } = toneService;
        setUiState({
            octave,
            sequence,
            scale
        })
    }

    return (
        <div className={`border-black border border-solid ${isHovered && "bg-white"} ${active && "bg-primary"} cursor-pointer p-[20px]`} 
            onMouseEnter={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            onClick={handleNodeClick}></div>
    )
}