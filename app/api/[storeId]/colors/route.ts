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
        const { name,value } = body;

        if (!name){
            return new NextResponse("Name is required",{status:400});
        }
        if (!value){
            return new NextResponse("Image Url is required",{status:400});
        }
        if(!params.storeId){
            return new NextResponse("storeId  is required",{status:400});
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

        const color = await prisma.color.create({
            data:{
                name,
                value,
                storeId:params.storeId,
            }
        })

        return NextResponse.json(color);

    }catch(error){
        console.log('[color_POST]',error);
        return new NextResponse("Internal Error",{status:500})
    }
}





export async function GET(req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        
        if(!params.storeId){
            return new NextResponse("storeId  is required ",{status:400});
        }


      

        const color = await prisma.color.findMany({
            where:{
                storeId:params.storeId,
            }
        })

        return NextResponse.json(color);

    }catch(error){
        console.log('[COLOR_GET]',error);
        return new NextResponse("Internal Error",{status:500})
    }
}