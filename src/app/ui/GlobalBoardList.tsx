'use client'

import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { ToneService } from "../util/ToneService";
import { getTransport } from "tone";
import { GlobalBoardStateContext } from "../GlobalBoardStateContext";

const DynamicInitialToneServiceContext = dynamic(() => import("../ToneServiceContext"))
const DynamicBoard = dynamic(() => import("../sequencer/Board"), {
    ssr: false
  })

export default function GlobalBoardList() {
    
  const [boardList, setBoardList] = useState<BoardElemenObject[]>([]);
  
  const screenFlag = typeof screen == "undefined";
  
  const { boardRegistry } = useContext(GlobalBoardStateContext);

  const [screenOrientation, setScreenOrientation] = useState<string>(screenFlag  ? "portrait-primary" : screen.orientation.type);

  useEffect(()=> {
      if(screenFlag) return;
        screen.orientation.addEventListener("change", (event) => {
        const orientation = event.target as ScreenOrientation;
        setScreenOrientation(orientation.type);
        })
    },[])

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
  
  const screenWidth = screenFlag ? 0 : screen.width; 
  
  return (
    screenWidth < 600 && screenOrientation!="landscape-primary" ? 
    <div className="h-screen w-screen flex flex-col justify-center">
         <img src="rotate-svg1.svg" alt="an icon suggesting that you should rotate your phone" id="rotationImage"/>
         <h1 className="italic mx-[22px]">you must put your phone in landscape mode to use this app.</h1> 
    </div> :
    <div className="flex flex-col w-full h-full md:h-auto md:w-auto md:my-[60px] md:px-0" id="rootDiv">
      <div className="flex w-1/3 justify-between mb-[12px]">
        <button className="btn btn-success" onClick={togglePlay}>play/pause</button>
        <button className="btn btn-error" onClick={stopClear}>stop/clear</button>
      </div>
      {boardList.map(beo => beo.element)}
      <button className="btn btn-info self-end" onClick={addNewBoard}>add new</button>      
    </div>
  );
}

