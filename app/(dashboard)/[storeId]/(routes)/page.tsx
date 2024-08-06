import React from 'react'

export default function Dashboard({params}:{params:{storeId:string}}) {
  
  return (
    <div>
      {`${params.storeId}  Hi from the dashboard`   }
    </div>
  )
}


