import { useContext, useEffect, useRef, useState } from "react"
import { ToneServiceContext } from "../ToneServiceContext"

export default function BeatOverlay({width} : {width: number}){

    const elRef = useRef<HTMLDivElement>(null);

    const { toneService } = useContext(ToneServiceContext);

    const [offset, setOffset] = useState<number>(0);

    
    
    //register setoffset dispatch function to toneservice to be used in callback loop, render current position based on offset state
    useEffect(()=> {
        toneService.beatOverlayDispatch = setOffset;
        if(elRef.current){
            elRef.current.style.left=`${offset}px`
        }   
    }, [offset])

    //set width of overlay based on width of sequencer nodes as registered to toneservice
    useEffect(()=> {
        if(elRef.current){
            const width = toneService.nodeWidth.toString();
            elRef.current.style.width=width+"px";
        }
    }, [])

    return (
        <div ref={elRef} className="outline outline-offset-1 outline-amber-600 rounded h-full absolute z-0">

        </div>
    )
}
