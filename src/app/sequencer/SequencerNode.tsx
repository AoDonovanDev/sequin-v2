import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react"


export default function SequencerNode( { n, active, activateNode } : {n: string, active: boolean, activateNode: Dispatch<SetStateAction<string>>}){

    const [isHovered, setIsHovered] = useState(false);

    function handleMouseOver(e: SyntheticEvent){
        setIsHovered(true);
    }

    function handleMouseLeave(e: SyntheticEvent){
        setIsHovered(false);
    }

    return (
        <div className={`border-black border border-solid ${isHovered && "bg-white"} ${active && "bg-red-400"} cursor-pointer`} 
            onMouseEnter={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            onClick={()=>activateNode(current => {
                return current == n ? "" : n;
            })}>{n}</div>
    )
}