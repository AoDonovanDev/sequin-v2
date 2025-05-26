
import { Board, UiState } from "../types/declarations";
import { initialSequenceValues } from "./constants";
import { v4 as uuid } from "uuid";

export class BoardRegistry{
    boardList: Set<Board> = new Set();
    boardIdSet: Set<string> = new Set();
    id = uuid();

    clearAndReset(){
        this.boardList.forEach(b => {
            b.uiDispatch((state: UiState) => {
                return {
                    ...state,
                    sequence: initialSequenceValues
                }
            });
            b.toneService.clearToneServiceSequence();
        })
    }
}