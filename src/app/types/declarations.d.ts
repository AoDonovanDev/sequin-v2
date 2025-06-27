interface UiState{
    octave: number,
    scale: string[],
    sequence: (string | null)[]
}

interface ToneServiceState {
    toneService : ToneService;
}

interface ToneServiceStateProviderProps {
    children: ReactElement,
    contextValue: ToneService
}

interface BoardInternal {
    id: string,
    toneService: ToneService,
    uiDispatch: Dispatch<SetStateAction<UiState>>
}

interface BoardElemenObject {
    id: string,
    element: React.JSX.Element
}

type OrientationLockType = "any" | "landscape" | "natural" | "portrait" | OrientationType
interface ScreenOrientation extends EventTarget {
  lock(orientation: OrientationLockType): Promise<void>;
}