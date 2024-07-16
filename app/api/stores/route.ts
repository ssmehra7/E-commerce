import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    try{
        const { userId } = auth();
        const body = await req.json();
        if(!userId){
            return new NextResponse("Unauthroized",{status:401});
        }
        const {name} = body;

        if (!name){
            return new NextResponse("Name is required",{status:400});
        }

        const store = await prisma.store.create({
            data:{
                name,
                userId
            }
        })

        return NextResponse.json(store);

    }catch(error){
        console.log('[STORES_POST',error);
        return new NextResponse("Internal Error",{status:500})
    }
}