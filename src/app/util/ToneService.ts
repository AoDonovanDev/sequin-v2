import * as Tone from "tone";
import { scaleMap } from "./scaleMap";
import { Dispatch, SetStateAction } from "react";
import { UiState } from "../sequencer/Board";
import { ActiveBeat } from "../sequencer/Beat";

export class ToneService{

    instance: Tone.Synth<Tone.SynthOptions> | Tone.DuoSynth | Tone.AMSynth;

    sequence: (string | null)[];

    octave: number;

    scale: string[];

    scaleName: string;

    currentSequence?: Tone.Sequence;

    activeBeat: number;

    beatDispatcherMap: {
        [key: number]: Dispatch<SetStateAction<ActiveBeat>>
    }

    activeBeatLoop?: Tone.Loop;

    constructor(scaleName: string){
        this.instance = new Tone.Synth().toDestination();
        this.sequence = new Array(16).fill(null);
        this.octave = 2;
        this.scale = this.scaleConstructor(scaleName);
        this.scaleName = scaleName;
        this.activeBeat = 0;
        this.beatDispatcherMap = {};
    }

    updateBeatUI(){
        if(!this.activeBeatLoop){
            this.activeBeatLoop = new Tone.Loop(() => {
                this.activeBeat++;
                if(this.activeBeat>15){
                    this.beatDispatcherMap[15](this.activeBeat);
                    this.activeBeat = 0;
                }
                if(this.activeBeat > 0){
                    this.beatDispatcherMap[this.activeBeat-1](this.activeBeat);
                }
                this.beatDispatcherMap[this.activeBeat](this.activeBeat);
            }, "8n").start(0)
        }
        
    }
    
    updateSequenceAtIndex(note: string, scaleIndex: number, index: number): void{
        if(this.sequence[index]==note){
            this.sequence[index] = null;
        } else {
            this.sequence[index] = this.scale[scaleIndex];
        }
        console.log(this.sequence);
        console.log(this.currentSequence);
    }

    playSequence(){
        if(!this.currentSequence){
            this.currentSequence = new Tone.Sequence( (time, note) => {
               const now = Tone.immediate();
               this.instance.triggerAttackRelease(note!, ".1", now, 1);
            }, this.sequence, "8n");
            this.currentSequence.start();
        } else {
            this.currentSequence.events = this.sequence;
        }
        if(Tone.getTransport().state=='stopped' || Tone.getTransport().state=='paused'){
            Tone.getTransport().start();

        }
        
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

    getActiveBeat(){
        return this.activeBeat;
    }

}