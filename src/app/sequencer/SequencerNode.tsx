'use client';

import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { useContext } from "react";
import { ToneServiceContext } from "../ToneServiceContext";
import { UiState } from "./Board";


export default function SequencerNode( { note, nodeIsActive, count, scaleIndex, setUiState } : {
    note: string, 
    nodeIsActive: boolean,
    count: number,
    scaleIndex: number,
    setUiState: Dispatch<SetStateAction<UiState>>  
}){

    const [isHovered, setIsHovered] = useState(false);

    const { toneService } = useContext(ToneServiceContext);

    function handleMouseOver(e: SyntheticEvent){
        if(nodeIsActive) return;
        setIsHovered(true);
    }

    function handleMouseLeave(e: SyntheticEvent){
        setIsHovered(false);
    }    

    function handleNodeClick(){
        toneService.updateSequenceAtIndex(note, scaleIndex, count);
        toneService.playSequence();
        const { octave, sequence, scale } = toneService;
        setUiState(state => {
            return {
                ...state,
                octave,
                sequence,
                scale
                }
            }
        )
    }

    return (
        <div className={`border-black border border-solid ${isHovered && "bg-white"} ${nodeIsActive && "bg-primary"} cursor-pointer p-[20px]`} 
            onMouseEnter={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            onClick={handleNodeClick}></div>
    )
}