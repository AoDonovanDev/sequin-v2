'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { ToneService } from "./util/ToneService";
import { getTransport } from "tone";

export default function Home() {

  const [boardList, setBoardList] = useState<React.JSX.Element[]>([]);

  const DynamicInitialToneServiceContext = dynamic(() => import("./ToneServiceContext"))
  const DynamicBoard = dynamic(() => import("./sequencer/Board"), {
    ssr: false
  })
  

  useEffect( () => {
    setBoardList([
      <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
        <DynamicBoard testDelete={testDelete}/>
      </DynamicInitialToneServiceContext>
    ])
  }, [])

  function addNewBoard(){
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
      setBoardList(boardList.map( b =>
        <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
          <DynamicBoard testDelete={testDelete}/>
        </DynamicInitialToneServiceContext>)
      );
      getTransport().cancel();
      getTransport().stop();
    }
  

  function testDelete(){
     console.log("asdfasdfasdfhuhhhhhhhhhhhhhhhhhhhh: ")
     setBoardList(bl => {
      console.log("huhhhhhhhhhhhhhhhhhhhh: ")
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

