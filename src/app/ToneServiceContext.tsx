import { createContext, ReactElement } from "react";
import { ToneService } from "./util/ToneService";
import { getTransport } from "tone";

//configure transport
const transport = getTransport();
transport.loop = true; transport.loopStart = 0; transport.loopEnd = 4;

export interface ToneServiceState {
    toneService : ToneService;
}

export const ToneServiceContext = createContext<ToneServiceState>({
    toneService: new ToneService("major")
});

export interface ToneServiceStateProviderProps {
    children: ReactElement,
    contextValue: ToneService
}

const DynamicToneServiceContextProvider = (
    props: ToneServiceStateProviderProps): ReactElement => {
    return (
            <ToneServiceContext.Provider value={{toneService: props.contextValue}}>
                {props.children}
            </ToneServiceContext.Provider>)
}

export default DynamicToneServiceContextProvider;
