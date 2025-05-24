import * as Tone from "tone";
import { scaleMap } from "./scaleMap";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";

export class ToneService{

    instrument: Tone.Synth<Tone.SynthOptions> | Tone.DuoSynth | Tone.AMSynth;

    sequence: (string | null)[];

    octave: number;

    scale: string[];

    scaleName: string;

    currentSequence: Tone.Sequence;

    beatOverlayDispatch!: Dispatch<SetStateAction<number | null>>;

    nodeWidth: number = 0; 

    id = uuid();
    
    activeBeatLoop?: Tone.Loop;

    //loop progress values are from 0-1, this is multipled by 16 and floored to match values for a 16 note sequence
    transportProgress: number = Math.floor(Tone.getTransport().progress*16);

    constructor(scaleName: string){
        this.instrument = new Tone.Synth().toDestination();
        this.sequence = new Array(16).fill(null);
        this.octave = 2;
        this.scale = this.scaleConstructor(scaleName);
        this.scaleName = scaleName;
        this.currentSequence = new Tone.Sequence( (time, note) => {
               const now = Tone.now();
               this.instrument.triggerAttackRelease(note!, "64n", now);
            }, this.sequence, "8n");

    }
    
    updateBeatOverlay(){
        if(!this.activeBeatLoop){
            this.activeBeatLoop = new Tone.Loop(() => {
                const trasportProgress =  Math.floor(Tone.getTransport().progress*16);
                this.transportProgress = trasportProgress;
                this.beatOverlayDispatch(offset => this.nodeWidth*trasportProgress);
            }, "8n").start(0);
        }
    }

    updateSequenceAtIndex(note: string, scaleIndex: number, index: number): void{
        if(this.sequence[index]==note){
            this.sequence[index] = null;
        } else {
            this.sequence[index] = this.scale[scaleIndex];
        }
    }

    playSequence(){    
        this.currentSequence.events = this.sequence;
        this.currentSequence.start(0);        
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
        this.instrument.dispose();
        this.instrument = new Tone.DuoSynth().toDestination();
    }

    setAMSynth(){
        this.instrument.dispose();
        this.instrument = new Tone.AMSynth().toDestination();
    }

    setSynth(){
        this.instrument.dispose();
        this.instrument = new Tone.Synth().toDestination()
    }

    async start(){
        if(Tone.getTransport().state=='stopped'){
            Tone.start().then(resolve => Tone.getTransport().start());
        } 
    }

    togglePlay(){
        if(Tone.getTransport().state=='stopped' || Tone.getTransport().state=='paused'){
            Tone.getTransport().start().nextSubdivision("8n");
        } else {
            Tone.getTransport().pause();
        }
    }

    stopClear(){
        Tone.getTransport().stop();
        this.sequence = new Array(16).fill(null);
        this.currentSequence.clear();
        this.beatOverlayDispatch(0);
    }
}