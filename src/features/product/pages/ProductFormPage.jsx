
import FormProduct from "@f/product/components/ProductForm/FormProduct";
import FormDimentions from "@f/product/components/ProductForm/FormDimentions";
import FormCategory from "@f/product/components/ProductForm/FormCategory";
import FormTags from "@f/product/components/ProductForm/FormTags";
import { useProductForm } from "@f/product/hooks/useProductForm";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useEffect } from "react";
import CreateButton from "@/features/product/components/ProductForm/CreateButton";
import UpdateButton from "@/features/product/components/ProductForm/UpdateButton";
import FetchState from "@/components/common/FetchState";
import TitleForm from "@/components/common/TitleForm";


export default function ProductFormPage(){

    const crudHook = useProductForm()
    const { loading, error, 
    setError, success, setSuccess, setId, currentItem } = crudHook

    const { idParam } = useUrlParams()

    useEffect(()=>{
        if(idParam) setId(idParam)
    },[idParam])



    return (
        <FetchState.Modal hook={{ loading, error, setError, success, setSuccess }}  >
                
            <>    
                <TitleForm />

                <div className="mb-3">
                    
                    <FormProduct crudHook={crudHook} />

                    <FormDimentions crudHook={crudHook} />

                    <FormCategory crudHook={crudHook}  />

                    <FormTags crudHook={crudHook}/>
                </div>

                <div className="d-flex mt-5 justify-content-center gap-3">
                    <CreateButton {...crudHook} />
                    <UpdateButton {...crudHook} />
                </div>    

            </>    

        </FetchState.Modal> 
    )
}
