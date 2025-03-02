'use client';

import { v4 as uuid } from "uuid";
import { Dispatch, SetStateAction, useState} from "react";
import dynamic from "next/dynamic";
import { UiState } from "./Board";

const SequencerNode = dynamic(() => import("./SequencerNode"), {
    ssr: false
});

export default function Beat( { count, scale, sequence, setUiState } : { 
    count: number, 
    scale: string[], 
    sequence: (string | null)[],
    setUiState: Dispatch<SetStateAction<UiState>>
}){
    return(
        <div className={`grid ${count % 4 == 0 && "bg-gray-300"}`}>
            <div className="bg-base-100">{count}</div> 
            {scale.map( (n, index) => <SequencerNode key={uuid()} note={n} active={sequence[count]==n} count={count} scaleIndex={index} setUiState={setUiState}/>)}
        </div>       
    )
}