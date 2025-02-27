import * as Tone from "tone";

export class ToneService{

    instance: Tone.Synth<Tone.SynthOptions>;

    sequence: (string | null)[];


    constructor(){
        this.instance = new Tone.Synth().toDestination();
        this.sequence = new Array(16).fill(null);
    }

    
    updateSequence(note: string, index: number): void{
        if(this.sequence[index]==note){
            this.sequence[index] = null;
        } else {
            this.sequence[index] = note;
        }
        console.log(this.sequence);
    }

    playSequence(){
        new Tone.Sequence((time, note) => {
            this.instance.triggerAttackRelease(note!, 0.1, time);
            // subdivisions are given as subarrays
        }, this.sequence).start(0);
        Tone.getTransport().start();
    }

}