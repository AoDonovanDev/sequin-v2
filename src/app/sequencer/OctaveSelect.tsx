import { Dispatch, SetStateAction, useState } from "react"


export default function OctaveSelect( { setOctave } : { setOctave: Dispatch<SetStateAction<number>>}){
    return (
        <div style={{transform: "rotate(270deg)"}} className="relative top-[80px] h-[60px]">
            <input type="range" min={1} max={4} defaultValue={2} className="range" step={1} onChange={(e)=>setOctave(parseInt(e.target.value))}/>
            <div className="flex justify-between px-2 text-xs">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
        </div>
    )
}