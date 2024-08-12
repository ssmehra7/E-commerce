import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        const { userId } = auth();
        const body = await req.json();
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }
        const { name , billboardId } = body;

        if (!name){
            return new NextResponse("Name is required",{status:400});
        }
        if (!billboardId){
            return new NextResponse("BillboardId is required",{status:400});
        }
        if(!params.storeId){
            return new NextResponse("StoreId  is required",{status:400});
        }

        const storebyUserId = await prisma.store.findFirst({
            where:{
                id:params.storeId, 
                userId
            }
        })

        if (!storebyUserId){
            return new NextResponse("Unauthorized",{status:403})
        }

        const billboard = await prisma.category.create({
            data:{
                name,
                billboardId,
                storeId:params.storeId,
            }
        })

        return NextResponse.json(billboard);

    }catch(error){
        console.log('[CATEGORY_POST]',error);
        return new NextResponse("Internal Error",{status:500})
    }
}





export async function GET(req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        
        if(!params.storeId){
            return new NextResponse("StoreId  is required",{status:400});
        }


      

        const categories = await prisma.category.findMany({
            where:{
                storeId:params.storeId,
            }
        })

        return NextResponse.json(categories);

    }catch(error){
        console.log('[CATEGORIES_GET]',error);
        return new NextResponse("Internal Error",{status:500})
    }
}