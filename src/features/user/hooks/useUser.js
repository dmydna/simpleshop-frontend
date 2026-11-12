import React, { useEffect } from "react";
import {userService} from "@f/user/service/userService.js";
import {useFetchData} from "@hooks/useFetchData.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useUser = (fetchElemMethod=null) => {

    const {loading: loadingList, error: errorList, content, setContent, ...props}
        = useFetchData({service: userService})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId, fetchElem, refreshElem }
        = useFetchElem({fetchMethod: fetchElemMethod || userService.getById})

    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        id, setId,
        currentItem, 
        setCurrentItem,
        fetchElem,
        refreshElem,
        /* Custom Name */
        userId: id,
        setUserId: setId,
        currentUser: currentItem,
        setCurrentUser: setCurrentItem,
        users: content,
        setUsers: setContent,

    })
}
