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

    return(
        <div className={`grid rounded-xl ${count % 4 == 0 && "bg-gray-300"}  z-10`}>
            {scale.map( (n, index) => <SequencerNode key={uuid()} note={n} nodeIsActive={sequence[count]==n} count={count} scaleIndex={index} setUiState={setUiState}/>)}
        </div>       
    )
}