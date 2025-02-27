import { v4 as uuid } from 'uuid';
import SequencerNode from './SequencerNode';
import { Dispatch, SetStateAction, useState } from 'react';


export default function Beat( { count, scale } : {count: number, scale: string[] }){

    const [activeNode, setActiveNode] = useState("");
    return(
        <div className={`grid ${count % 4 == 0 && "bg-gray-300"}`}>
            <div className="bg-base-100">{count}</div> 
            {scale.map(n => <SequencerNode key={uuid()} note={n} active={activeNode==n} setActiveNode={setActiveNode} count={count} />)}
        </div>       
    )
}