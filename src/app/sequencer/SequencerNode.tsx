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

    const [isHovered, setIsHovered] = useState(false);

    const { toneService } = useContext(ToneServiceContext);

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

    const elRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        if(elRef.current && isReferenceNode){         
            toneService.nodeWidth = elRef.current.getClientRects()[0].width;
            console.log("inside noderef register useeffect: ", elRef.current.getClientRects()[0].width)
        }
    }, [])

    return (
        <div ref={elRef} className={`border-black border border-solid ${isHovered && "bg-white"} ${nodeIsActive && "bg-primary"} cursor-pointer w-[38px] h-[38px] md:w-[44px] md:h-[44px]`} 
            onMouseEnter={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            onClick={handleNodeClick}></div>
    )
}