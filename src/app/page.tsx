'use client'

import dynamic from "next/dynamic";

const DynamicGlobalBoardList = dynamic(()=>import("./ui/GlobalBoardList"), {
    ssr: false
  })

export default function Home() {
  return (
    <DynamicGlobalBoardList />
  );
}

