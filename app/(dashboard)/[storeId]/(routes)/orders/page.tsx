
import {format} from "date-fns";
import { Separator } from "@/components/ui/separator";
import {  OrderClient } from "./components/client";
import axios from "axios";
import prisma from "@/lib/db";
import {  OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
// import { useParams, useRouter } from "next/navigation";





const Order = async ({params}:{params:{storeId:string}}) =>{
    const orders = await prisma.order.findMany({
        where:{
            storeId:params.storeId,
        },
        orderBy:{
            createdAt:'desc'
        }, 
        include:{
            orderItems:{
                include:{
                    product:true,
                }
            }
        }
    });


    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address, // Corrected spelling
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(
            item.orderItems.reduce((total, orderItem) => {
                return total + Number(orderItem.product.price);
            }, 0) // Added initial value for reduce
        ),
        isPaid:item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));
    


    return (
       <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data ={formattedOrders}/>
            </div>
        </div>
        
       </>
    )
}



export default Order; 