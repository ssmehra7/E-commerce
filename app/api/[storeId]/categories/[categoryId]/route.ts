import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{storeId:string,categoryId:string}}) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name , billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
        return new NextResponse("BillboardId is required", { status: 400 });
      }

    if (!params.categoryId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const category = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      }
    });

    return NextResponse.json(category);

  } catch (e) {
    console.log('[Billboard_PATCH]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,categoryId:string}}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
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

    const category = await prisma.category.deleteMany({
      where: {
        id: params.categoryId,
      }
    });

    return NextResponse.json(category);

  } catch (e) {
    console.log('[Category_DELETE]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function GET(req:Request,{params}:{params:{categoryId:string}}) {
    try {
      const { userId } = auth();
  
  
      if (!params.categoryId) {
        return new NextResponse("Billboard id is required", { status: 400 });
      }
  
      
  
      const category = await prisma.category.findUnique({
        where: {
          id: params.categoryId,
        }, 
        include:{
          billboard:true,  
        }
      });
  
      return NextResponse.json(category);
  
    } catch (e) {
      console.log('[Category_GET]', e);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  