import { ToggleIcon } from "@/components/common/FloatButtonCollection";
import { favoriteService } from "@/features/favorite/services/favoriteService";
import { useAsync } from "@/hooks/useAsync";
import { useUrlState } from "@/hooks/useUrlState";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import { useUrlParams } from "@/hooks/useUrlParams";

export default function FavoriteFloatButton({item, style, className}){

   const { isAuth } = useAuthContext()
   const [isFavorite, setIsFavorite] = useState(false);


   const { setSearchParams } = useUrlState()
   const { actionParam }     = useUrlParams()

   const msg_add = "Add to favorites";
   const msg_del = "Remove to favorites";

   const options = (msg) => ({
      onSuccess : () => {
         if(isFavorite){
           setIsFavorite(false);
         }else{
           setIsFavorite(true);
         }
         toast.success(msg);
      },
      onError: (err) =>{
         if (err?.code === 'TOKEN_EXPIRED') {
            setSearchParams(prev => ({...prev, dialog: 'expiredsession'}))
            return;
         }
         toast.warning(err?.menssage || "Operacion Error");
      }

    })

   const createFavorite = useAsync(favoriteService.create, {...options(msg_add)});
   const deleteFavorite = useAsync(favoriteService.Delete, {...options(msg_del)});
   const checkFavorite  = useAsync(favoriteService.isFavoriteProduct);

   const checkFavoriteStatus = useCallback(async () => {
      if(item?.id != undefined)
         setIsFavorite(await checkFavorite.execute(item.id))
   }, [item])

    useEffect(() => {
        checkFavoriteStatus();
    }, [checkFavoriteStatus]);



    const toggleFavorite = useCallback( (isAuth) => {
      if(!isAuth) return
      if( !isFavorite ) {
         createFavorite.execute(item.id)
      }else{
         deleteFavorite.execute(item.id)
      }
    }, [createFavorite, deleteFavorite, isFavorite])



    useEffect(()=>{
      if(actionParam == 'togglefav'){
         toggleFavorite(isAuth)
      }
    },[actionParam, isAuth])


	return (
      <>
         {createFavorite?.loading &&
            <span className="p-2 rounded-circle">
               <Spinner size="sm"/>
            </span>}
         {!createFavorite?.loading &&
            <ToggleIcon
               disabled= { item?.meta?.status !== "ACTIVE" }
               status={ isFavorite }
            	style={ style }
               className={`border rounded-circle bg-wh01 ${className}`}
               action={ () => toggleFavorite(isAuth) }
               icon="heart"
            />}
      </>
	)
}
