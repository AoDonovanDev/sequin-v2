'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { ToneService } from "./util/ToneService";

export default function Home() {

  const [boardList, setBoardList] = useState<React.JSX.Element[]>([]);

  

  useEffect( () => {
    const DynamicInitialToneServiceContext = dynamic(() => import("./ToneServiceContext"))
    const DynamicBoard = dynamic(() => import("./sequencer/Board"), {
      ssr: false
      })

    setBoardList([
      <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
        <DynamicBoard />
      </DynamicInitialToneServiceContext>
    ])
  }, [])

  function addNewBoard(){
    const DynamicInitialToneServiceContext = dynamic(() => import("./ToneServiceContext"))
     const DynamicBoard = dynamic(() => import("./sequencer/Board"), {
      ssr: false
    })

    setBoardList( [
      ...boardList,
      <DynamicInitialToneServiceContext contextValue={new ToneService("major")} key={uuid()}>
        <DynamicBoard />
      </DynamicInitialToneServiceContext>
    ])
  }

  return (
    <div className="flex flex-col self-center my-[60px]">
      {boardList}
      <button className="btn btn-info self-end" onClick={addNewBoard}>add new</button>
    </div>
  );
}

