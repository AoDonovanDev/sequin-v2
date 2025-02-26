import { v4 as uuid } from 'uuid';
import SequencerNode from './SequencerNode';
import { useState } from 'react';


export default function Beat( { count, scale } : {count: number, scale: string[]}){

    const [activeNode, setActiveNode] = useState("");

    return(
        <div className="grid">
            <div>{count}</div> 
            {scale.map(n => <SequencerNode key={uuid()} n={n} active={activeNode==n} activateNode={setActiveNode} />)}
        </div>       
    )
}