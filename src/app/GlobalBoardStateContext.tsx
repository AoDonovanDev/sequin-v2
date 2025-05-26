import { createContext } from "react";
import { BoardRegistry } from "./util/BoardRegistry";

export const GlobalBoardStateContext = createContext({
    boardRegistry: new BoardRegistry()
        }
    );