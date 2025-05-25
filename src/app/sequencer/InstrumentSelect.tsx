import { useContext } from "react";
import { ToneServiceContext } from "../ToneServiceContext";



export default function InstrumentSelect(){

    const { toneService } = useContext(ToneServiceContext);

    return(
        <div className="flex flex-col mt-[60px]">
            <button className="btn btn-primary" onClick={()=>toneService.setSynth()}>synth</button>
            <button className="btn btn-secondary" onClick={()=>toneService.setAMSynth()}>AM synth</button>
            <button className="btn btn-info" onClick={()=>toneService.setDuoSynth()}>duo synth</button>
        </div>
    )

}