'use client';

import { v4 as uuid } from 'uuid';
import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { ToneServiceContext } from '../ToneServiceContext';

const SequencerNode = dynamic(() => import("./SequencerNode"));

export default function Beat( { count } : { count: number }){

    const [activeNode, setActiveNode] = useState("");

    const { toneService } = useContext(ToneServiceContext);

    return(
        <div className={`grid ${count % 4 == 0 && "bg-gray-300"}`}>
            <div className="bg-base-100">{count}</div> 
            {toneService.scale.map( (n, index) => <SequencerNode key={uuid()} note={n} active={activeNode==n} setActiveNode={setActiveNode} count={count} scaleIndex={index}/>)}
        </div>       
    )
}