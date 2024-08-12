"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Billboard, Size } from "@prisma/client"
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUploade from "@/components/ui/image-uploade";

interface SizeFormProps {
    initialData: Size | null;
}

const formSchema = z.object({
    name:z.string().min(2), 
    value:z.string().min(2),
    
});

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {




    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const origin = useOrigin();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        },
    });

    const title = initialData ? "Edit Size" : "Create Size";
    const description = initialData ? "Edit a Size" : "Add a new Size";
    const toastMessage = initialData ? "Size updated" : "Size Created.";
    const action = initialData ? "Save Changes" : "Create";

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        console.log(initialData);

        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, values);
            }

            router.refresh();
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage);
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteStore() {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
            router.refresh();
            router.push(`/${params.storeId}/sizes`)

            toast.success("Store successfully deleted");
        } catch (error) {
            toast.error("Make sure you removed all products  using this billboard first.");
            // setLoading(false);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => { setOpen(false) }}
                onConfirm={handleDeleteStore}
                loading={loading}

            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (<Button variant="destructive" size="icon" onClick={() => { setOpen(true) }}>
                    <Trash className="h-4 w-4" />
                </Button>)}
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
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Size Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Update Your Store Name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Size Value" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Update Your Store Name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} type="submit">{action}</Button>
                    </form>
                </div>
            </Form>
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public" />
        </>
    );
}

export default SizeForm;
