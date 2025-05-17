import { useContext, useEffect, useRef, useState } from "react"
import { ToneServiceContext } from "../ToneServiceContext"

export default function BeatOverlay({width} : {width: number}){

    const elRef = useRef<HTMLDivElement>(null);

    const [offset, setOffset] = useState<number>(0);

    const { toneService } = useContext(ToneServiceContext);
    
    useEffect(()=> {
        toneService.beatOverlayDispatch = setOffset;
        if(elRef.current){
            elRef.current.style.left=`${offset}px`
        }   
    }, [offset])

    useEffect(()=> {
        if(elRef.current){
            const width = toneService.nodeWidth.toString();
            console.log(width)
            elRef.current.style.width=width+"px";
            console.log(elRef.current.style.width)
        }
    }, [])

    return (
        <div ref={elRef} className="outline outline-offset-1 outline-amber-600 rounded h-full absolute z-0">

        </div>
    )
}
