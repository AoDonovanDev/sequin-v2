'use client';

import { v4 as uuid } from 'uuid';
import { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ToneServiceContext } from '../ToneServiceContext';

const SequencerNode = dynamic(() => import("./SequencerNode"), {
    ssr: false
});

export default function Beat( { count } : { count: number }){

    const [activeNode, setActiveNode] = useState("");
    const { toneService } = useContext(ToneServiceContext);
    const [scale, setScale] = useState([""]);
    
    console.log("scale at top level of beat", scale)

    useEffect(() => {
        setScale(current => {
            const copy = [...toneService.scale];
            console.log("value of toneService.scale being set to scale state var in useEffect", copy)
            return copy;
            }
        );
        console.log("use effect updates scale, should trigger re render of all beats", toneService.scale);
        console.log("here is the updated scale", scale);
    }, [toneService.scale])

    return(
        <div className={`grid ${count % 4 == 0 && "bg-gray-300"}`}>
            <div className="bg-base-100">{count}</div> 
            {scale.map( (n, index) => <SequencerNode key={uuid()} note={n} active={activeNode==n} setActiveNode={setActiveNode} count={count} scaleIndex={index}/>)}
        </div>       
    )
}