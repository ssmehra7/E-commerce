"use client";


import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";


export default function CreateStoreBtn(){
    const storeModal = useStoreModal();

    const handleCreateStore =()=>{
        storeModal.onOpen();
    }
    
    return(
        <Button variant={"outline"} size={"default"} className="rounded-md  flex justify-center items-center" onClick={handleCreateStore}>
        <Plus className="w-4 h-4  flex justify-center items-center" strokeWidth={3}/>
        </Button>
    )
}