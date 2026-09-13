import { useValidationFormModes } from "@/features/form/hooks/useValidationFormModes.js";
import { productService } from '@/features/product/services/productService.js';
import { useFetchElem } from "@/hooks/useFetchElem";
import { useService } from "@/hooks/useService";
import { ProductDTO } from "@/utils/schemas";
import { useState } from "react";

export const useProductForm = () => {

    // General states
    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode]  = useState();
    const [scheme, setScheme] = useState(ProductDTO)
    
    // config hooks
    const configService = {service: productService}
    const configElem = {fetchMethod: productService.getById}

    const { id, setId, loading, error: errorItem, currentItem,  setCurrentItem, refreshElem } = 
    useFetchElem({...configElem})
    const { ... formCrud } = useValidationFormModes(currentItem, scheme, "create");
    const { ...servicesMethods } = useService({ ...configService});

    return ({
        ...servicesMethods,
        // Form
        ...formCrud,
        scheme,
        setScheme,

        // Fetch state
        loading,
        errorItem,

        // Product
        id,setId,
        setCurrentItem,
        currentProduct: currentItem,
        currentItem,
        refreshElem,
        dataItem,
        setDataItem,

        // Mode
        crudMode, 
        setCrudMode,
        showModal, 
        setShowModal,
    })
}
