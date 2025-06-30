import { SyntheticEvent, useContext, useState } from "react";
import { ToneServiceContext } from "../ToneServiceContext";



export default function InstrumentSelect(){

    const { toneService } = useContext(ToneServiceContext);

    const [active, setActive] = useState<string>("synth");

    function handleClick(e: SyntheticEvent){
        const eventTarget = e.target as HTMLButtonElement;
        const instrument = eventTarget.id;
        switch(instrument){
            case "synthBtn":
                toneService.setSynth();
                setActive("synth");
                break;
            case "AMSynthBtn":
                toneService.setAMSynth();
                setActive("AMSynth");
                break;
            case "duoSynthBtn":
                toneService.setDuoSynth();
                setActive("DuoSynth");
                break;
        }
    }

    return(
        <div className="flex flex-col lg:mt-[60px]">
            <button className={`btn btn-primary ${active == "synth" && "btn-active"}`} id="synthBtn" onClick={handleClick}>synth</button>
            <button className={`btn btn-secondary ${active == "AMSynth" && "btn-active"}`} id="AMSynthBtn" onClick={handleClick}>AM synth</button>
            <button className={`btn btn-info ${active == "DuoSynth" && "btn-active"}`} id="duoSynthBtn" onClick={handleClick}>duo synth</button>
        </div>
    )

}