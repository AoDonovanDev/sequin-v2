export default function scalePicker(octave: number, scale: string): string[]{
    switch(scale){
        case "major":
            return [`C${octave+1}`, `B${octave}`, `A${octave}`, `G${octave}`, `F${octave}`, `E${octave}`, `D${octave}`, `C${octave}`];
        case "minor":
            return [`C${octave+1}`, `A#${octave}`, `A${octave}`, `G${octave}`, `F${octave}`, `D#${octave}`, `D${octave}`, `C${octave}`];
        case "chromatic":
            return [`C${octave+1}`, `B${octave}`, `A#${octave}`, `A${octave}`, `G#${octave}`, `G${octave}`, `F#${octave}`, `F${octave}`, `E${octave}`, `D#${octave}`, `D${octave}`, `C#${octave}`, `C${octave}`];
    }
    return ["whats this"];
}