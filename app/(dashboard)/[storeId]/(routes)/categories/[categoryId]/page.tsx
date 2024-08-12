import prisma from "@/lib/db";
import CategoryForm from "./components/category-form";


const CategoriesPage = async({params}:{
    params:{categoryId:string, storeId:string}
}) =>{

    const categories = await prisma.category.findUnique({
        where:{
            id:params.categoryId
        }
    }); 

    const billboards = await prisma.billboard.findMany({
        where:{
            storeId:params.storeId
        }
    });


    return (
       <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryForm 
                initialData={categories}
                billboards ={billboards}/>
        </div>
       </div>
    )
}

export default CategoriesPage;