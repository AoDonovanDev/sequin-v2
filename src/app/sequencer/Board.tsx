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
        console.log("remove called");
        toneService.shutDown();
        boardRegistry.removeBoard(id);
    }

    return (
        <div className="border-black border-[1px] border-solid rounded-xl shadow-xl md:p-[20px] mb-[20px] " style={{userSelect: "none"}}>
            <div className="flex relative">
                <BeatOverlay />
                {uiState.sequence.map((n: (string|null), i: number) => <DynamicBeat key={uuid()} count={i} scale={uiState.scale} sequence={uiState.sequence} setUiState={setUiState} />)}
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <button className="btn btn-accent w-3/4" onClick={clearSequence}>clear</button>
                        <img src="close1.svg" className="btn btn-ghost p-0" onClick={removeSelf}/>
                    </div>
                    <DynamicOctaveSelect setUiState={setUiState}/>
                    <InstrumentSelect />
                </div>
            </div>
        </div>
    )
}