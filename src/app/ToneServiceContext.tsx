import { createContext, ReactElement } from "react";
import { ToneService } from "./util/ToneService";
import { getTransport } from "tone";
import { ToneServiceState, ToneServiceStateProviderProps } from "./types/declarations";

//configure transport
const transport = getTransport();
transport.loop = true; transport.loopStart = 0; transport.loopEnd = 4;

export const ToneServiceContext = createContext<ToneServiceState>({
    toneService: new ToneService("major")
});



const DynamicToneServiceContextProvider = (
    props: ToneServiceStateProviderProps): ReactElement => {
    return (
            <ToneServiceContext.Provider value={{toneService: props.contextValue}}>
                {props.children}
            </ToneServiceContext.Provider>)
}

export default DynamicToneServiceContextProvider;
