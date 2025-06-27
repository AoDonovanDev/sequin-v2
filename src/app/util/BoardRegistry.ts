
import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";

export class BoardRegistry{
    boardInternalList: Set<BoardInternal> = new Set();
    boardIdSet: Set<string> = new Set();
    id = uuid();
    boardListDispatch!: Dispatch<SetStateAction<BoardElemenObject[]>>;

    clearAndReset(){
        this.boardInternalList.forEach(b => {
            b.uiDispatch((state: UiState) => {
                return {
                    ...state,
                    sequence: new Array(16).fill(null)
                }
            });
            b.toneService.clearToneServiceSequence();
        })
    }

    removeBoard(id: string){
        this.boardListDispatch(list => {
            console.log(id)
            const filtered = [...list].filter(b => b.id != id);
            console.log(filtered)
            return filtered;
        });
    }
}