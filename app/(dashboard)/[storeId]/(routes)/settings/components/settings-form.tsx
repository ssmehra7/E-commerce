"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Store } from "@prisma/client"
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface SettingFormProps{
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(4).max(50),
});

export const SettingsForm: React.FC<SettingFormProps> =  ({ initialData }) => {

   


    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const params = useParams();
    const router  = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData,
    });

   async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        console.log(initialData);

        try{
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`,values);
            router.refresh();
            toast.success("Store updated");
        }catch(e){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    async function handleDeleteStore(){
        try {
            const response = await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push('/');
            toast.success("Store successfully deleted");
        } catch (error) {
            toast.error("Something went wrong in deletion");
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferences" />
                <Button variant="destructive" size="icon" onClick={handleDeleteStore}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>

            <Separator />

            <Form {...form}>
                <div className="w-1/3 border px-2 py-2">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Storename</FormLabel>
                                <FormControl>
                                    <Input placeholder="Storename" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Update Your Store Name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save Changes</Button>
                </form>
                </div>
            </Form>
        </>
    );
}

export default SettingsForm;
