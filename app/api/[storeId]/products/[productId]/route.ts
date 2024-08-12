










import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { storeId: string, productId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name, 
        price, 
        categoryId, 
        colorId, 
        sizeId, 
        isFeatured, 
        isArchived,
        images: {
          deleteMany: {}
        }
      }
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({
              url: image.url,
            })),
          },
        },
      },
    });

    return NextResponse.json(product);

  } catch (e) {
    console.log('[Product_PATCH]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, productId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("product id is required", { status: 400 });
    }

    const storebyUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storebyUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      }
    });

    return NextResponse.json(product);

  } catch (e) {
    console.log('[Product_DELETE]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function GET(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { userId } = auth();


    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }



    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      }
    });

    return NextResponse.json(product);

  } catch (e) {
    console.log('[Product_GET]', e);
    return new NextResponse("Internal error", { status: 500 });
  }
}



