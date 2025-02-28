'use client';

import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { useContext } from "react";
import { ToneServiceContext } from "../ToneServiceContext";


export default function SequencerNode( { note, active, setActiveNode, count, scaleIndex } : {
    note: string, 
    active: boolean, 
    setActiveNode: Dispatch<SetStateAction<string>>, 
    count: number,
    scaleIndex: number    
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
        setActiveNode(current => {
            return current == note ? "" : note;
        })
        toneService.updateSequence(note, scaleIndex, count);
        toneService.playSequence();
    }

    return (
        <div className={`border-black border border-solid ${isHovered && "bg-white"} ${active && "bg-primary"} cursor-pointer p-[20px]`} 
            onMouseEnter={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            onClick={handleNodeClick}></div>
    )
}