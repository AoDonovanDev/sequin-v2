'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ToneServiceContext } from "../ToneServiceContext";


export default function SequencerNode( { note, nodeIsActive, count, scaleIndex, setUiState, isReferenceNode } : {
    note: string, 
    nodeIsActive: boolean,
    count: number,
    scaleIndex: number,
    setUiState: Dispatch<SetStateAction<UiState>>,
    isReferenceNode: boolean  
}){

    if(isReferenceNode){
        const width = screen.width;
        console.log("here is the screen width reported by ref node: ", width);
    }

    const [isHovered, setIsHovered] = useState(false);

    const { toneService } = useContext(ToneServiceContext);

    const elRef = useRef<HTMLDivElement>(null);

    function handleMouseOver(){
        if(nodeIsActive) return;
        setIsHovered(true);
    }

    function handleMouseLeave(){
        setIsHovered(false);
    }    

    async function handleNodeClick(){
        await toneService.start();
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

    useEffect(()=> {
        if(elRef.current && isReferenceNode){         
            toneService.nodeWidth = elRef.current.getClientRects()[0].width;
        }
    }, [])

    return (
        <div ref={elRef} className={`border-black border border-solid ${isHovered && "bg-white"} ${nodeIsActive && "bg-primary"} cursor-pointer w-[34px] h-[34px] lg:w-[44px] lg:h-[44px]`} 
            onMouseEnter={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            onClick={handleNodeClick}></div>
    )
}