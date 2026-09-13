import { useValidationFormModes } from "@/features/form/hooks/useValidationFormModes.js";
import { useFetchElem } from "@/hooks/useFetchElem";
import { useService } from "@/hooks/useService";
import { userService } from "@f/user/service/userService.js";
import { useState } from "react";



// Se usa profile porque incluye mas datos que user
export const useUserForm = (fetchProfile=true) => {

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode] = useState();
    const [scheme, setScheme] = useState(null)

    // config hooks
    const configService = {service: userService}
    const configElem = {fetchMethod: userService.getById}

  const { id, setId, loading, error: errorItem, currentItem,  setCurrentItem, refreshElem }
     = useFetchElem({...configElem})

    const { ... formCrud } = useValidationFormModes(currentItem, scheme, "create");
    const { ...servicesMethods} = useService({ ...configService});

    return ({
        ...servicesMethods,
        // Form
        ...formCrud,
        scheme,
        setScheme,

        // Fetch state
        loading,
        errorItem,

        // Listing
        id,setId,
        setCurrentItem,
        currentUser: currentItem,
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
