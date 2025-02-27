import { createContext, ReactElement } from "react";
import { ToneService } from "./util/ToneService";

const toneService = new ToneService();

export interface ToneServiceState {
    toneService : ToneService;
}

export const ToneServiceContext = createContext<ToneServiceState>({
    toneService
});

export interface ToneServiceStateProviderProps {
    children: ReactElement
}

export const ToneServiceContextProvider = (
    props: ToneServiceStateProviderProps
): ReactElement => {
    return (
        <ToneServiceContext.Provider value={{
                toneService: new ToneService()
            }}>
            {props.children}
        </ToneServiceContext.Provider>
    )
}