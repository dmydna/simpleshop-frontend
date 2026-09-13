import { useValidationFormModes } from "@/features/form/hooks/useValidationFormModes.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";
import { useService } from "@/hooks/useService.js";
import { listingService } from '@f/listing/services/listingService.js';
import { useState } from "react";





// Nota1: 
// Este hook hace referencia a la instancia de un elemento.
// No se manejan listas.
// Nota2:
// Este hook deberia llamarse useListingAction para hacer referencia
// al componente listingActions

export const useListingForm = () => {

    // General states
    const [dataItem, setDataItem] = useState({});

    // config hooks
    const configService = {service: listingService}
    const configElem = {fetchMethod: listingService.getByHash}

    const { id, setId, loading, error: errorItem, currentItem,  setCurrentItem, refreshElem }
     = useFetchElem({...configElem})

    const { ... formCrud } = useValidationFormModes(currentItem);
    const { ...servicesMethods} = useService({ ...configService});


    return ({
        ...servicesMethods,
        // Form
        ...formCrud,

        // Fetch state
        loading,
        errorItem,

        // Listing
        id,setId,
        setCurrentItem,
        currentListing: currentItem,
        currentItem,
        refreshElem,
        dataItem,
        setDataItem,
    
    })
}
