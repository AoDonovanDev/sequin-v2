import * as Tone from "tone";
import { scaleMap } from "./scaleMap";

export class ToneService{

    instance: Tone.Synth<Tone.SynthOptions>;

    sequence: (string | null)[];

    octave: number;

    scale: string[];

    scaleName: string;

    currentSequence?: Tone.Sequence;


    constructor(scaleName: string){
        this.instance = new Tone.Synth().toDestination();
        this.sequence = new Array(16).fill(null);
        this.octave = 1;
        this.scale = this.scaleConstructor(scaleName);
        this.scaleName = scaleName;
    }

    
    updateSequence(note: string, scaleIndex: number, index: number): void{
        if(this.sequence[index]==note){
            this.sequence[index] = null;
        } else {
            this.sequence[index] = this.scale[scaleIndex];
        }
        console.log(this.sequence);
    }

    playSequence(){
        this.currentSequence?.dispose();
        this.currentSequence = new Tone.Sequence((time, note) => {
            this.instance.triggerAttackRelease(note!, 0.1, time);
        }, this.sequence).start(0);
        Tone.getTransport().start();
    }

    setOctave(num: number){
        this.octave = num;
        this.scale = this.scaleConstructor(this.scaleName)
    }

    scaleConstructor(scaleName: string) : string[]{
        return scaleMap[scaleName]!.map((note, index) => index == 0 ? `${note}${this.octave+1}` : `${note}${this.octave}`);
    }

}