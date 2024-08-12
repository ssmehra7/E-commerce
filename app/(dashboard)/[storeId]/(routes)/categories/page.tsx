
import {format} from "date-fns";
import { Separator } from "@/components/ui/separator";
import { CategoryClient} from "./components/client";
import axios from "axios";
import prisma from "@/lib/db";
import { CategoryColumn } from "./components/columns";
// import { useParams, useRouter } from "next/navigation";





const Categories = async ({params}:{params:{storeId:string}}) =>{
    const categories = await prisma.category.findMany({
        where:{
            storeId:params.storeId,
        },
        include:{
            billboard:true,
        },
        orderBy:{
            createdAt:'desc'
        }
    });


    const formattedCategories: CategoryColumn[]= categories.map((item)=>({
        id:item.id,
        name:item.name,
        billboardLabel: item.billboard.label,
        createdAt:format(item.createdAt,"MMMM do, yyyy"),

    }));


    return (
       <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data ={formattedCategories}/>
            </div>
        </div>
        
       </>
    )
}



export default Categories; 