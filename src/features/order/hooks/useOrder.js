import { orderService } from "@f/order/services/orderService.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useOrder = (config) => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: orderService, autofetch: false ,...config })

    const { loading: loadingItem, error: errorItem, setError: setErrorItem ,currentItem, setCurrentItem, id, setId, refreshElem }
        = useFetchElem({ fetchMethod: orderService.getMyOrder })

    

    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error: errorList || errorItem,
        orders: content,
        setOrders: setContent,
        currentOrder: currentItem,
        setCurrentOrder: setCurrentItem,
        orderHash: id,
        setOrderHash: setId,
        setErrorItem,
        refreshElem
    })
}
