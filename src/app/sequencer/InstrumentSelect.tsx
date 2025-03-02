import { useContext } from "react";
import { ToneServiceContext } from "../ToneServiceContext";



export default function InstrumentSelect(){

    const { toneService } = useContext(ToneServiceContext);

    return(
        <>
        <button className='btn btn-primary relative top-[120px] w-3/4 self-center' onClick={()=>toneService.setSynth()}>synth</button>
        <button className='btn btn-secondary relative top-[120px] w-3/4 self-center' onClick={()=>toneService.setAMSynth()}>AM synth</button>
        <button className='btn btn-info relative top-[120px] w-3/4 self-center' onClick={()=>toneService.setDuoSynth()}>duo synth</button>
        </>
    )

}