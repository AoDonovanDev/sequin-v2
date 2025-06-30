'use client';

import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { ToneServiceContext } from "../ToneServiceContext";
import InstrumentSelect from "./InstrumentSelect";
import BeatOverlay from "./BeatOverlay";
import { GlobalBoardStateContext } from "../GlobalBoardStateContext";

const DynamicBeat = dynamic(() => import("./Beat"), {
    ssr: false
})

const DynamicOctaveSelect = dynamic(() => import("./OctaveSelect"), {
    ssr: false
});



export default function Board( { id } : {id: string} ){

    const { toneService } = useContext(ToneServiceContext);
    const { boardRegistry } = useContext(GlobalBoardStateContext);
    
    const [uiState, setUiState] = useState({
        octave: toneService.octave,
        sequence: toneService.sequence,
        scale: toneService.scale
    })

    const [screenOrientation, setScreenOrientation] = useState<string>(screen.orientation.type);


    

    useEffect(()=> {
        screen.orientation.addEventListener("change", (event) => {
        const orientation = event.target as ScreenOrientation;
        setScreenOrientation(orientation.type);
        })
    },[])

    useEffect(()=> {
        toneService.updateBeatOverlay();
        if(!boardRegistry.boardIdSet.has(id)){
            boardRegistry.boardIdSet.add(id);
            boardRegistry.boardInternalList.add({
                id,
                uiDispatch: setUiState,
                toneService: toneService
            })
        }
    }, [])


    function clearSequence(){
        toneService.clearSequence();
        setUiState({
            ...uiState,
            sequence: toneService.sequence
        })
    }

    function removeSelf(){
        toneService.shutDown();
        boardRegistry.removeBoard(id);
    }
    return (
         screen.width<600 && screenOrientation != "landscape-primary" ? <h1 className="absolute left-20 top-60">turn it sideways :p</h1> :
         <div className="border-black border-[1px] border-solid rounded-xl shadow-xl pl-[20px] py-[20px] mb-[20px] lg:pr-[20px]" style={{userSelect: "none"}}>
            <div className="flex relative">
                {uiState.sequence.map((n: (string|null), i: number) => <DynamicBeat key={uuid()} count={i} scale={uiState.scale} sequence={uiState.sequence} setUiState={setUiState} />)}
                <div className="flex flex-col justify-between px-[2px]">
                    <div className="flex">
                        <button className="btn btn-accent lg:w-3/4" onClick={clearSequence}>clear</button>
                        <img src="close1.svg" className="btn btn-ghost p-0" onClick={removeSelf}/>
                    </div>
                    <div className="flex flex-col">
                        <DynamicOctaveSelect setUiState={setUiState}/>
                        <InstrumentSelect />
                    </div>
                </div>
                <BeatOverlay />
            </div>
        </div>
    )
}