interface ScaleMapInterface {
    [key: string]: string[] | undefined,
    major: string[],
    minor: string[],
    chromatic: string[]
}

export const scaleMap: ScaleMapInterface = {
    major: [`C`, `B`, `A`, `G`, `F`, `E`, `D`, `C`],
    minor: [`C`, `A#`, `A`, `G`, `F`, `D#`, `D`, `C`],
    chromatic: [`C`, `B`, `A#`, `A`, `G#`, `G`, `F#`, `F`, `E`, `D#`, `D`, `C#`, `C`]
}