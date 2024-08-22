import { getGraphRevenue } from '@/actions/get-graph-revenue'
import { getSalesCount } from '@/actions/get-sales-count'
import { getStockCount } from '@/actions/get-stocks-count copy'
import { getTotalRevenue } from '@/actions/get-total-revenue'
import { OverView } from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { formatter } from '@/lib/utils'
import { CreditCard, DollarSign, Package } from 'lucide-react'
import React from 'react'

export default async function Dashboard({params}:{params:{storeId:string}}) {
  
const totalRevenue = await getTotalRevenue(params.storeId);
const salesCount = await getSalesCount(params.storeId);
const stockCount = await getStockCount(params.storeId);

const GraphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview Of Your Store'/>
        <Separator/>
        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground'/>
             
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle>
                Sales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground'/>
             
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>
                {salesCount}
              </div>
            </CardContent>
            
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle>
                Products In Stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground'/>
             
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>
                {stockCount}
              </div>
            </CardContent>
            
          </Card>
        </div>

        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>OverView</CardTitle>
            
          </CardHeader>
          <OverView data={GraphRevenue}/>
        </Card>

      </div>
    </div>
  )
}


