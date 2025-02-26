'use client'

import Beat from "./Beat";
import { v4 as uuid } from 'uuid';


export default function Board( { octave } : {octave: number}){

   
    const beats = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    let scale = [`C${octave+1}`, `B${octave}`, `A#${octave}`, `A${octave}`, `G#${octave}`, `G${octave}`, `F#${octave}`, `F${octave}`, `E${octave}`, `D#${octave}`, `D${octave}`, `C#${octave}`, `C${octave}`]

    return (
        <div className="flex border-black border-2 border-solid rounded-lg shadow-xl" style={{userSelect: "none"}}>
            {beats.map(b => <Beat key={uuid()} count={b} scale={scale}/>)}
        </div>
    )
}