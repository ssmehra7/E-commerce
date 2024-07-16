"use client"


import { Modal } from "@/components/helper_ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useStoreModal((state)=>state.onOpen);
  const isOpen = useStoreModal((state)=>state.isOpen);

  useEffect(()=>{
    if(!isOpen){
    onOpen();
    
    }
  },[isOpen,onOpen]);

  return (
    <div>
      Root Page
    </div>
      
  );
}
