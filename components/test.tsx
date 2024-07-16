"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Button } from "./ui/button";


export default function Test(){
const storeModal = useStoreModal();

    return (
        <Button onClick={()=>{
            storeModal.onOpen();
        }}>
            Create Store
        </Button>
    )
}