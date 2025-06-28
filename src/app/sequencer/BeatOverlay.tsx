import { useContext, useEffect, useRef, useState } from "react"
import { ToneServiceContext } from "../ToneServiceContext"

export default function BeatOverlay(){

    const elRef = useRef<HTMLDivElement>(null);

    const { toneService } = useContext(ToneServiceContext);

    const [offset, setOffset] = useState<number | null>(null);
    
    //register setoffset dispatch function to toneservice to be used in callback loop, render current position based on offset state
    useEffect(()=> {
        toneService.beatOverlayDispatch = setOffset;
        if(elRef.current){
            elRef.current.style.left=`${offset}px`
        }   
    }, [offset])

    //set width of overlay based on width of sequencer nodes as registered to toneservice
    useEffect(()=> {
        if(toneService.nodeWidth && elRef.current){
            elRef.current.style.width=`${toneService.nodeWidth}px`;
            console.log("BeatOverlay useEffect inside: ", toneService.nodeWidth)
        }
        console.log("BeatOverlay useEffect outside: ", toneService.nodeWidth)
    }, [toneService.nodeWidth])

    return (
        <div ref={elRef} className={typeof offset == 'number' ? "outline outline-offset-1 outline-amber-600 rounded h-full absolute z-0" : "rounded h-full absolute z-0"}>

        </div>
    )
}
