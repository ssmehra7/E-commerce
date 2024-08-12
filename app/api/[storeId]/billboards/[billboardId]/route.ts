


  







import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{storeId:string,billboardId:string}}) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label,imgUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!label) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imgUrl) {
        return new NextResponse("Image Url is required", { status: 400 });
      }

    if (!params.billboardId) {
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

    const billboard = await prisma.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imgUrl,
      }
    });

    return NextResponse.json(billboard);

  } catch (e) {
    console.log('[Billboard_PATCH]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,billboardId:string}}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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

    const billboard = await prisma.billboard.deleteMany({
      where: {
        id: params.billboardId,
      }
    });

    return NextResponse.json(billboard);

  } catch (e) {
    console.log('[BillBoard_DELETE]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function GET(req:Request,{params}:{params:{billboardId:string}}) {
    try {
      const { userId } = auth();
  
  
      if (!params.billboardId) {
        return new NextResponse("Billboard id is required", { status: 400 });
      }
  
      
  
      const billboard = await prisma.billboard.findUnique({
        where: {
          id: params.billboardId,
        }
      });
  
      return NextResponse.json(billboard);
  
    } catch (e) {
      console.log('[BillBoard_GET]', e);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  


  