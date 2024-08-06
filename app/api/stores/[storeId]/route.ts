import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{storeId:string}}) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
    });

    return NextResponse.json(store);

  } catch (e) {
    console.log('[STORE_PATCH]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string}}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    });

    return NextResponse.json(store);

  } catch (e) {
    console.log('[STORE_DELETE]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
