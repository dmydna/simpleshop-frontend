import { HoverIcon } from "@/components/common/FloatButtonCollection";
import { listingService } from "@/features/listing/services/listingService";
import { useAsync } from "@/hooks/useAsync";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useUrlState } from "@/hooks/useUrlState";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function StatusFloatButton({ item, style, className }) {
   
	const [ activeButton, setActiveButton ] = useState(true);
   const [ fetchStatus, setFetchStatus ] = useState(null);
   const navigate = useNavigate()

   const { setSearchParams } = useUrlState()

   const msg_show = "producto visible"
   const msg_hide = "producto oculto"

   const onSuccess = (data) => {

      item.meta.status = data?.meta?.status

      if (data?.meta?.status === "ACTIVE") {
         toast.success(msg_show);
      } else {
         toast.success(msg_hide);
      }
      // refrescar pagina
      setSearchParams(prev => ({...prev, pageVersion: Date.now() }))
   } 
   const onError = (err) => {
      if (err?.code === 'TOKEN_EXPIRED') {
         setSearchParams(prev => ({...prev, dialog: 'expiredsession'})) 
         return;
      }
      toast.warning(err?.menssage || "error en la operacion!");
   }

   const updateStatus = useAsync(
      listingService.updateStatus, { onSuccess, onError }
   );

   const handleToggle = useCallback(async()=>{
      if(item?.meta?.status == "ACTIVE"){
         await updateStatus.execute(item.id, "INACTIVE")
      }else{
         await updateStatus.execute(item.id, "ACTIVE")
      }
   },[item.id, item.meta.status, updateStatus])



   const icon = useMemo(()=>{

      if(updateStatus?.data?.meta.status == "ACTIVE") return "eye"
      return "eye-slash"
   },[fetchStatus, updateStatus])

   return (

      <>
      {updateStatus?.loading && 
         <span className="p-2 rounded-circle">
            <Spinner size="sm"/>
         </span>}
      {!updateStatus?.loading &&
      <HoverIcon
         style={style}
         disabled={updateStatus.loading}
         className={`border rounded-circle bg-wh01 ${className}`} 
         action={handleToggle}
         icon={icon}
      />}
      </>
   )
}