export interface UiState{
    octave: number,
    scale: string[],
    sequence: (string | null)[]
}

export interface ToneServiceState {
    toneService : ToneService;
}

export interface ToneServiceStateProviderProps {
    children: ReactElement,
    contextValue: ToneService
}

export interface Board {
    id: string,
    toneService: ToneService,
    uiDispatch: Dispatch<SetStateAction<UiState>>
}

