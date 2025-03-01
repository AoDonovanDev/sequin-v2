'use client';

import { v4 as uuid } from 'uuid';
import { useState} from 'react';
import dynamic from 'next/dynamic';

const SequencerNode = dynamic(() => import("./SequencerNode"), {
    ssr: false
});

export default function Beat( { count, scale } : { count: number, scale: string[]}){

    const [activeNode, setActiveNode] = useState("");

    return(
        <div className={`grid ${count % 4 == 0 && "bg-gray-300"}`}>
            <div className="bg-base-100">{count}</div> 
            {scale.map( (n, index) => <SequencerNode key={uuid()} note={n} active={activeNode==n} setActiveNode={setActiveNode} count={count} scaleIndex={index}/>)}
        </div>       
    )
}