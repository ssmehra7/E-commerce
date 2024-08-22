


import { UserButton } from "@clerk/nextjs";
import MainNav from "./MainNav";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import Test from "./test";
import { StoreSwitcher2 } from "./store-switcher2";


import CreateStoreBtn from "./create-store";
import { ModeToggle } from "./theme-toggle";





export default async function Navbar() {
    const { userId } = auth();
    

    if (!userId){
        redirect('/sign-in');
    }
    const items = await prisma.store.findMany({
        where:{
            userId
        }
    })
    // console.log(items);

    
   


    return (

        <div className="border-b h-16 items-center flex px-4 justify-between ">
            <div className="flex gap-4">


               <div className="flex gap-1 justify-center items-center">
               <StoreSwitcher2 items={items}/>
                <div className="flex justify-center items-center">
                        <CreateStoreBtn/>
                </div>
               </div>
               
                
                
            <div className="flex justify-center items-center">
            <MainNav />
            </div>
                

            </div>

            <div className="flex items-center space-x-4">
                <ModeToggle/>
                <UserButton />
            </div>
        </div>
    )
}