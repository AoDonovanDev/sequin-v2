'use client';

import { Dispatch, SetStateAction, SyntheticEvent, useContext } from "react"
import { ToneServiceContext } from "../ToneServiceContext";
import { UiState } from "./Board";


export default function OctaveSelect( { setUiState }: {setUiState: Dispatch<SetStateAction<UiState>>} ){

    const { toneService } = useContext(ToneServiceContext);

    function handleOctaveSelect(event: SyntheticEvent){
        const target = event.target as HTMLInputElement
        const newOctaveValue = parseInt(target.value);
        toneService.setOctave(newOctaveValue)
        setUiState((state) => {
            const {octave, scale, sequence} = toneService;
            return {
                ...state,
                octave,
                scale,
                sequence
            }
        })
    }

    return (
        <div style={{transform: "rotate(270deg)"}} className="h-[60px] mt-[60px]">
            <input type="range" min={1} max={4} defaultValue={2} className="range" step={1} onChange={handleOctaveSelect}/>
            <div className="flex justify-between px-2 text-xs">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
        </div>
    )
}