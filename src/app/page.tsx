'use client'

import Board from "./sequencer/Board";
import dynamic from "next/dynamic";

const DynamicBoard = dynamic(() => import("./sequencer/Board"), {
  ssr: false
})

export default function Home() {
  return (
    <div className="flex justify-center my-[60px]">
      <DynamicBoard />
    </div>
  );
}

