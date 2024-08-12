


  







import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{storeId:string,sizeId:string}}) {
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

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const size = await prisma.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(size);

  } catch (e) {
    console.log('[SIZE_PATCH]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,sizeId:string}}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("sizeId  is required", { status: 400 });
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

    const size = await prisma.size.deleteMany({
      where: {
        id: params.sizeId,
      }
    });

    return NextResponse.json(size);

  } catch (e) {
    console.log('[SIZE_DELETE]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function GET(req:Request,{params}:{params:{sizeId:string}}) {
    try {
      const { userId } = auth();
  
  
      if (!params.sizeId) {
        return new NextResponse("Billboard id is required", { status: 400 });
      }
  
      
  
      const size = await prisma.size.findUnique({
        where: {
          id: params.sizeId,
        }
      });
  
      return NextResponse.json(size);
  
    } catch (e) {
      console.log('[SIZE_GET]', e);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  


  