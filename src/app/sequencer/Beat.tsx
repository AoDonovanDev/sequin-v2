'use client';

import { v4 as uuid } from "uuid";
import { Dispatch, SetStateAction, use, useContext, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import { UiState } from "./Board";
import { useRef } from "react";
import { ToneServiceContext } from "../ToneServiceContext";

const SequencerNode = dynamic(() => import("./SequencerNode"), {
    ssr: false
});

export type ActiveBeat = number | null;

export default function Beat( { count, scale, sequence, setUiState} : { 
    count: number, 
    scale: string[], 
    sequence: (string | null)[],
    setUiState: Dispatch<SetStateAction<UiState>>
}){

    const { toneService } = useContext(ToneServiceContext);
    const [activeBeat, setActiveBeat] = useState<ActiveBeat>(toneService.activeBeat);
    useEffect(()=>{
        toneService.beatDispatcherMap[count] = setActiveBeat;
    })

    return(
        <div className={`grid rounded-xl ${count % 4 == 0 && "bg-gray-300"} ${activeBeat==count && "outline outline-offset-1 outline-amber-600" }`}>
            <div className="bg-base-100">{count}</div> 
            {scale.map( (n, index) => <SequencerNode key={uuid()} note={n} nodeIsActive={sequence[count]==n} count={count} scaleIndex={index} setUiState={setUiState}/>)}
        </div>       
    )
}