
import {format} from "date-fns";
import { Separator } from "@/components/ui/separator";
import {  ProductClient } from "./components/client";
import axios from "axios";
import prisma from "@/lib/db";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
// import { useParams, useRouter } from "next/navigation";





const Products = async ({params}:{params:{storeId:string}}) =>{
    const products = await prisma.product.findMany({
        where:{
            storeId:params.storeId,
        },
        include:{
            category:true, 
            size:true, 
            color:true
        },
        orderBy:{
            createdAt:'desc'
        }
    });




    const formattedProducts: ProductColumn[]= products.map((item)=>({
        id:item.id,
        name:item.name,
        isFeatured:item.isFeatured,
        isArchived:item.isArchived,
        price:formatter.format(item.price.toNumber()),
        category:item.category.name, 
        size:item.category.name,
        color:item.color.value,
        createdAt:format(item.createdAt,"MMMM do, yyyy"),

    }));


    return (
       <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data ={formattedProducts}/>
            </div>
        </div>
        
       </>
    )
}



export default Products; 