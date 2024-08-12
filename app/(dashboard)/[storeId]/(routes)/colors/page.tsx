
import {format} from "date-fns";
import { Separator } from "@/components/ui/separator";
import { ColorsClient } from "./components/client";
import axios from "axios";
import prisma from "@/lib/db";
import {  Colorcolumn } from "./components/columns";
// import { useParams, useRouter } from "next/navigation";





const Color = async ({params}:{params:{colorId:string}}) =>{
    const colors = await prisma.color.findMany({
        where:{
            storeId:params.colorId,
        },
        orderBy:{
            createdAt:'desc'
        }
    });


    const formattedColors: Colorcolumn[]= colors.map((item)=>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt:format(item.createdAt,"MMMM do, yyyy"),

    }));


    return (
       <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data ={formattedColors}/>
            </div>
        </div>
        
       </>
    )
}



export default Color; 