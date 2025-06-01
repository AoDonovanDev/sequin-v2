'use client'

import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { ToneService } from "./util/ToneService";
import { getTransport } from "tone";
import { GlobalBoardStateContext } from "./GlobalBoardStateContext";
import { BoardElemenObject } from "./types/declarations";



export default function Home() {
  const [boardList, setBoardList] = useState<BoardElemenObject[]>([]);

  const DynamicInitialToneServiceContext = dynamic(() => import("./ToneServiceContext"))
  const DynamicBoard = dynamic(() => import("./sequencer/Board"), {
    ssr: false
  })
  
  const { boardRegistry } = useContext(GlobalBoardStateContext);
  
  useEffect( () => {
    boardRegistry.boardListDispatch = setBoardList;
    const boardId = uuid();
    setBoardList([
      {
        id: boardId,
        element: <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
                  <DynamicBoard id={boardId}/>
                 </DynamicInitialToneServiceContext>
      }
    ])
  }, [])

  function addNewBoard(){
     console.log(boardRegistry);
     const boardId = uuid();
    setBoardList( [
      ...boardList,
       {
        id: boardId,
        element: <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
                  <DynamicBoard id={boardId}/>
                 </DynamicInitialToneServiceContext>
      }
    ])
  }

  function togglePlay(){
    if(getTransport().state=='stopped' || getTransport().state=='paused'){
      getTransport().start().nextSubdivision("8n");
    } else { 
      getTransport().pause();
    }
  }
  
  function stopClear(){
      getTransport().stop();
      boardRegistry.clearAndReset();
    }
  

  return (
    <div className="flex flex-col w-full h-full md:h-auto md:w-auto my-[60px]" id="rootDiv">
      <div className="flex w-1/3 justify-between">
        <button className="btn btn-success" onClick={togglePlay}>play/pause</button>
        <button className="btn btn-error" onClick={stopClear}>stop/clear</button>
      </div>
      {boardList.map(beo => beo.element)}
      <button className="btn btn-info self-end" onClick={addNewBoard}>add new</button>
    </div>
  );
}

