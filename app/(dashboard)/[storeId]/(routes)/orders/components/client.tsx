"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Billboard } from "@prisma/client"
// import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import {  columns, OrderColumn } from "./columns"
import { DataTable } from "@/components/ui/data-table"
// import { ApiList } from "@/components/ui/api-list"

interface clientProps{
    data:OrderColumn[]
}

export const OrderClient:React.FC<clientProps> = ({data}) =>{
const router = useRouter();
const params = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title={`Order (${data.length})`}
            description="Manage Orders for your store"
            />
        
        </div>
        <Separator/>

        <DataTable
            columns={columns}
            data={data}
            searchKey="products"
        />
{/* 
        <Heading title="API" description="API calls for Orders"/>
        <Separator/>
        <ApiList entityName="orders" entityIdName="orderId"/> */}

        </>
    )
}


