import * as Tone from "tone";
import { scaleMap } from "./scaleMap";

export class ToneService{

    instance: Tone.Synth<Tone.SynthOptions> | Tone.DuoSynth | Tone.AMSynth;

    sequence: (string | null)[];

    octave: number;

    scale: string[];

    scaleName: string;

    currentSequence?: Tone.Sequence;


    constructor(scaleName: string){
        this.instance = new Tone.Synth().toDestination();
        this.sequence = new Array(16).fill(null);
        this.octave = 2;
        this.scale = this.scaleConstructor(scaleName);
        this.scaleName = scaleName;
    }

    
    updateSequenceAtIndex(note: string, scaleIndex: number, index: number): void{
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
        this.updateSequenceOctave(num);
        this.scale = this.scaleConstructor(this.scaleName);
        this.playSequence();
    }

    scaleConstructor(scaleName: string) : string[]{
        return scaleMap[scaleName]!.map((note, index) => index == 0 ? `${note}${this.octave+1}` : `${note}${this.octave}`);
    }

    updateSequenceOctave(num: number){
        this.sequence = this.sequence.map(note => {
            if(!note) return note;
            if(note == this.scale[0]){
                return note[0]+(this.octave+1)
            } else {
                return note.length < 3 ? note[0]+this.octave : note.slice(0,2)+this.octave;
            }
        })
    }

    setDuoSynth(){
        this.instance.dispose();
        this.instance = new Tone.DuoSynth().toDestination();
    }

    setAMSynth(){
        this.instance.dispose();
        this.instance = new Tone.AMSynth().toDestination();
    }

    setSynth(){
        this.instance.dispose();
        this.instance = new Tone.Synth().toDestination()
    }

}