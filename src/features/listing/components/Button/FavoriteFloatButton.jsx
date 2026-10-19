import { ToggleIcon } from "@/components/common/FloatButtonCollection";
import { favoriteService } from "@/features/favorite/services/favoriteService";
import { useAsync } from "@/hooks/useAsync";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FavoriteFloatButton({item, style, className}){
	
   const [isFavorite, setIsFavorite] = useState(false)

   const msg_add = "Add to favorites"
   const msg_del = "Remove to favorites"

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

    const toggleFavorite = useCallback( () => {
      if( !isFavorite ) {
         createFavorite.execute(item.id)
      }else{
         deleteFavorite.execute(item.id)
      }
    }, [createFavorite, deleteFavorite, isFavorite])


	return (
         <ToggleIcon
            disabled= { createFavorite.loading  || item?.meta?.status !== "ACTIVE" }
            status={ isFavorite }
         	style={ style }
            className={`border rounded-circle bg-wh01 ${className}`} 
            action={ toggleFavorite }
            icon="heart"
         />
	)
}
