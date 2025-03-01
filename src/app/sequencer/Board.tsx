'use client';

import { v4 as uuid } from 'uuid';
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from 'react';
import { ToneServiceContext } from '../ToneServiceContext';

const DynamicToneServiceContextProvider = dynamic(() => import("../ToneServiceContext"), {
    ssr: false
})

const DynamicBeat = dynamic(() => import("./Beat"), {
    ssr: false
})

const DynamicOctaveSelect = dynamic(() => import("./OctaveSelect"), {
    ssr: false
});

export default function Board(){
    
    const beats = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    const { toneService } = useContext(ToneServiceContext);
    const [scale, setScale] = useState(toneService.scale);

    useEffect(() => {
        setScale(toneService.scale);
    }, [toneService.scale])
    
    return (
        <div className="flex border-black border-[2px] border-solid rounded-xl shadow-md" style={{userSelect: "none"}}>
            <DynamicToneServiceContextProvider contextValue={toneService}>
            <>
                {beats.map(b => <DynamicBeat key={uuid()} count={b} scale={scale} />)}
                <DynamicOctaveSelect/>
            </>
            </DynamicToneServiceContextProvider>
        </div>
    )
}