import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

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

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                storeId: params.storeId,
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
    } catch (error) {
        console.log('[Product_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}




export async function GET(req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        const { searchParams } = new URL(req.url); 
        const categoryId = searchParams.get("categoryId")||undefined; 
        const colorId   = searchParams.get("colorId")||undefined;
        const sizeId = searchParams.get("sizeId")||undefined;
        const isFeatured   = searchParams.get("isFeatured");
        if(!params.storeId){
            return new NextResponse("StoreId  is required",{status:400});
        }


      

        const product = await prisma.product.findMany({
            where:{
                storeId:params.storeId,
                categoryId, 
                colorId, 
                sizeId, 
                isFeatured:isFeatured?true:undefined, 
                isArchived:false
            }, include:{
                images:true, 
                category:true, 
                color:true, 
                size:true,
            }, 
            orderBy:{
                createdAt:'desc',
            }
        })

        return NextResponse.json(product);

    }catch(error){
        console.log('[PRODUCT_GET]',error);
        return new NextResponse("Internal Error",{status:500})
    }
}


// export async function GET(
//     req: Request,
//     { params }: { params: { storeId: string } }
//   ) {
//     try {
//       const { searchParams } = new URL(req.url);
//       const categoryId = searchParams.get("categoryId");
//       const colorId = searchParams.get("colorId");
//       const sizeId = searchParams.get("sizeId"); // Added sizeId for filtering
//       const isFeatured = searchParams.get("isFeatured");
  
//       if (!params.storeId) {
//         return new NextResponse("StoreId is required", { status: 400 });
//       }
  
//       const products = await prisma.product.findMany({
//         where: {
//           storeId: params.storeId,
//         //   categoryId, // Ensure undefined if no filter
//         //   colorId, // Ensure undefined if no filter
//         //   sizeId, // Ensure undefined if no filter
//         //   isFeatured: isFeatured ? true : undefined, // Ensure undefined if no filter
//         //   isArchived: false,
//         },
//         include: {
//           images: true,
//           category: true,
//           color: true,
//           size: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
  
//       return NextResponse.json(products);
//     } catch (error) {
//       console.log("[PRODUCT_GET]", error);
//       return new NextResponse("Internal Error", { status: 500 });
//     }
//   }
  