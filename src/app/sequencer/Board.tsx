'use client';

import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
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

export default function Board({testDelete} : {testDelete: Dispatch<SetStateAction<any>>}){

    const { toneService } = useContext(ToneServiceContext);
    const { boardRegistry } = useContext(GlobalBoardStateContext);
    
    const [uiState, setUiState] = useState({
        octave: toneService.octave,
        sequence: toneService.sequence,
        scale: toneService.scale
    })

    useEffect(()=> {
        toneService.updateBeatOverlay();
        if(!boardRegistry.boardIdSet.has(toneService.id)){
            boardRegistry.boardIdSet.add(toneService.id);
            boardRegistry.boardList.add({
                id: toneService.id,
                uiDispatch: setUiState,
                toneService: toneService
            })
        }
    }, [])


    function clearSequence(){
        toneService.clearSequence()
        setUiState({
            ...uiState,
            sequence: toneService.sequence
        })
    }

   

    return (
        <div className="border-black border-[1px] border-solid rounded-xl shadow-xl p-[20px] mb-[20px]" style={{userSelect: "none"}}>
            
            <div className="flex relative">
                <BeatOverlay />
                {uiState.sequence.map((n: (string|null), i: number) => <DynamicBeat key={uuid()} count={i} scale={uiState.scale} sequence={uiState.sequence} setUiState={setUiState} />)}
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <button className="btn btn-accent w-3/4" onClick={clearSequence}>clear</button>
                        <img src="close1.svg" className="btn btn-ghost p-0" onClick={testDelete}/>
                    </div>
                    <DynamicOctaveSelect setUiState={setUiState}/>
                    <InstrumentSelect />
                </div>
            </div>
        </div>
    )
}