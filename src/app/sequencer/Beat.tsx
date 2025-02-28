'use client';

import { v4 as uuid } from 'uuid';
import { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ToneServiceContext } from '../ToneServiceContext';

const SequencerNode = dynamic(() => import("./SequencerNode"));

export default function Beat( { count } : { count: number }){

    const [activeNode, setActiveNode] = useState("");

    const [scale, setScale] = useState([""]);
    const { toneService } = useContext(ToneServiceContext);
    const fuck = toneService.scale;
    

    useEffect(() => {
        setScale(fuck);
        console.log("hmmmmmmmmm", fuck)
    }, [fuck])

    return(
        <div className={`grid ${count % 4 == 0 && "bg-gray-300"}`}>
            <div className="bg-base-100">{count}</div> 
            {scale.map( (n, index) => <SequencerNode key={uuid()} note={n} active={activeNode==n} setActiveNode={setActiveNode} count={count} scaleIndex={index}/>)}
        </div>       
    )
}