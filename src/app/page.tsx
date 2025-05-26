'use client'

import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { ToneService } from "./util/ToneService";
import { getTransport } from "tone";
import { GlobalBoardStateContext } from "./GlobalBoardStateContext";
import { BoardRegistry } from "./util/BoardRegistry";
import { initialSequenceValues } from "./util/constants";

export default function Home() {
  const [boardList, setBoardList] = useState<React.JSX.Element[]>([]);

  const DynamicInitialToneServiceContext = dynamic(() => import("./ToneServiceContext"))
  const DynamicBoard = dynamic(() => import("./sequencer/Board"), {
    ssr: false
  })
  
  const { boardRegistry } = useContext(GlobalBoardStateContext);

  useEffect( () => {
    setBoardList([
      <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
        <DynamicBoard testDelete={testDelete}/>
      </DynamicInitialToneServiceContext>
    ])
  }, [])

  function addNewBoard(){
     console.log(boardRegistry);
    setBoardList( [
      ...boardList,
      <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
        <DynamicBoard testDelete={testDelete}/>
      </DynamicInitialToneServiceContext>
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
  

  function testDelete(){
     setBoardList(bl => {
      const [...newList] = bl.filter((b,i)=>i>0);

      return newList;
     })
  }
  return (
    <div className="flex flex-col self-center my-[60px]">
      <div className="flex w-1/3 justify-between">
        <button className="btn btn-success" onClick={togglePlay}>play/pause</button>
        <button className="btn btn-error" onClick={stopClear}>stop/clear</button>
      </div>
      {boardList}
      <button className="btn btn-info self-end" onClick={addNewBoard}>add new</button>
    </div>
  );
}

