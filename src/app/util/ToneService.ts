import * as Tone from "tone";
import { scaleMap } from "./scaleMap";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";

export class ToneService{

    instance: Tone.Synth<Tone.SynthOptions> | Tone.DuoSynth | Tone.AMSynth;

    sequence: (string | null)[];

    octave: number;

    scale: string[];

    scaleName: string;

    currentSequence: Tone.Sequence;

    activeBeat: number = 0;

    beatOverlayDispatch!: Dispatch<SetStateAction<number>>;

    nodeWidth: number = 0; 

    id = uuid();
    
    activeBeatLoop?: Tone.Loop;

    constructor(scaleName: string){
        this.instance = new Tone.Synth().toDestination();
        this.sequence = new Array(16).fill(null);
        this.octave = 2;
        this.scale = this.scaleConstructor(scaleName);
        this.scaleName = scaleName;
        this.activeBeat = 0;
        this.currentSequence = new Tone.Sequence( (time, note) => {
               const now = Tone.now();
               this.instance.triggerAttackRelease(note!, "64n", now);
            }, this.sequence, "4n");
    }
    
    updateBeatOverlay(){
        //this.activeBeat = Math.floor(Tone.now()*4)%16;
        if(!this.activeBeatLoop){
            this.activeBeatLoop = new Tone.Loop(() => {
                this.activeBeat++;
                console.log("the beat: ", this.activeBeat);
                //console.log(Math.floor(Tone.now()*4)%16);
                if(this.activeBeat>15){
                    this.beatOverlayDispatch(c => c+this.nodeWidth);
                    this.activeBeat = 0;
                } else if(this.activeBeat==1){
                    this.beatOverlayDispatch(0);
                } else {
                    console.log("beat 15 should be here")
                    this.beatOverlayDispatch(c => c+this.nodeWidth);
                }
            }, "4n").start(0);
        }
    }

    updateSequenceAtIndex(note: string, scaleIndex: number, index: number): void{
        if(this.sequence[index]==note){
            this.sequence[index] = null;
        } else {
            this.sequence[index] = this.scale[scaleIndex];
        }
        console.log("here's my id: ", this.id);
    }

    playSequence(){    
        this.currentSequence.events = this.sequence;
        this.currentSequence.start(0);
        console.log(this.sequence);
        
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

    async start(){
        if(Tone.getTransport().state=='stopped'){
            console.log("heyyyyyyyyyyyy");
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
        this.activeBeat = 0;
        this.currentSequence.clear();
        this.beatOverlayDispatch(0);
    }
}