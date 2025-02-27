import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";


export default function SequencerNode( { note, active, setActiveNode, count } : {note: string, active: boolean, setActiveNode: Dispatch<SetStateAction<string>>, count: number}){

    const [isHovered, setIsHovered] = useState(false);


    function handleMouseOver(e: SyntheticEvent){
        if(active) return;
        setIsHovered(true);
    }

    function handleMouseLeave(e: SyntheticEvent){
        setIsHovered(false);
    }    

    return (
        <div className={`border-black border border-solid ${isHovered && "bg-white"} ${active && "bg-primary"} cursor-pointer p-[8px]`} 
            onMouseEnter={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            onClick={()=>setActiveNode(current => {
                return current == note ? "" : note;
            })}>{note}</div>
    )
}