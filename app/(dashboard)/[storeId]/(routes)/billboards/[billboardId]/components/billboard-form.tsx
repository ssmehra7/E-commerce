"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Billboard } from "@prisma/client"
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

interface BillboardFormProps {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(4).max(50),
    imgUrl: z.string().min(1),
});

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {




    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const origin = useOrigin();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imgUrl: '',
        },
    });

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
    const toastMessage = initialData ? "Billboard updated" : "Billboard Created.";
    const action = initialData ? "Save Changes" : "Create";

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        console.log(initialData);

        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, values);
            }

            router.refresh();
            router.push(`/${params.storeId}/billboards`)
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
            const response = await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`/${params.storeId}/billboards`)

            toast.success("Store successfully deleted");
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.");
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
                            name="imgUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUploade
                                            value={field.value ? [field.value] : []}
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
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
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
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

export default BillboardForm;
