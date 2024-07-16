"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Store } from "@prisma/client"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react"

type Checked = DropdownMenuCheckboxItemProps["checked"]
interface PropsType {
  items?: Store[] // Making the items prop optional
}

export function StoreSwitcher2({ items = [] }: PropsType) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [title, setTitle] = React.useState("Select Store")

  const formatedItems = items.map((item) => ({
    name: item.name,
    value: item.id
  }))

  const params = useParams()
  const router = useRouter()

  React.useEffect(() => {
    const currentStore = formatedItems.find((item) => item.value === params.storeId)
    if (currentStore) {
      setTitle(currentStore.name)
    } else {
      setTitle("Select Store")
    }
  }, [params.storeId, formatedItems])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="space-x-3">
          <StoreIcon className="mr-2 h-4 w-4" />
          {title}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Store List</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {formatedItems.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.value}
            onSelect={() => {
              setTitle(item.name)
              router.push(`/${item.value}`)
            }}
          > 
            <StoreIcon className="mr-2 h-4 w-4" />
            {item.name}
            {item.value === params.storeId? <Check className="ml-auto w-4 h-4"/>:null}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
