


  







import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{storeId:string,colorId:string}}) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name,value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
        return new NextResponse("Value is required", { status: 400 });
      }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const color = await prisma.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(color);

  } catch (e) {
    console.log('[COLOR_PATCH]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,colorId:string}}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("colorId  is required", { status: 400 });
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

    const color = await prisma.color.deleteMany({
      where: {
        id: params.colorId,
      }
    });

    return NextResponse.json(color);

  } catch (e) {
    console.log('[COLOR_DELETE]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function GET(req:Request,{params}:{params:{colorId:string}}) {
    try {
      const { userId } = auth();
  
  
      if (!params.colorId) {
        return new NextResponse("Billboard id is required", { status: 400 });
      }
  
      
  
      const color = await prisma.color.findUnique({
        where: {
          id: params.colorId,
        }
      });
  
      return NextResponse.json(color);
  
    } catch (e) {
      console.log('[COLOR_GET]', e);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  


  