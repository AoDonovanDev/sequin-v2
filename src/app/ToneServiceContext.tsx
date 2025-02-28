import { createContext, ReactElement } from "react";
import { ToneService } from "./util/ToneService";

const toneService = new ToneService("major");

export interface ToneServiceState {
    toneService : ToneService;
}

export const ToneServiceContext = createContext<ToneServiceState>({
    toneService
});

export interface ToneServiceStateProviderProps {
    children: ReactElement
}

const ToneServiceContextProvider = (
    props: ToneServiceStateProviderProps
): ReactElement => {
    return (
        <ToneServiceContext.Provider value={{
                toneService: new ToneService("major")
            }}>
            {props.children}
        </ToneServiceContext.Provider>
    )
}

export default ToneServiceContextProvider;