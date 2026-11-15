import { IconTint } from "@/components/common/FloatButtonCollection";
import StatusPill from "@/components/common/StatusPill";
import DeleteFloatButton from "@/features/listing/components/Button/DeleteFloatButton";
import EditFloatButton from "@/features/listing/components/Button/EditFloatButton";
import StatusFloatButton from "@/features/listing/components/Button/StatusFloatButton";
import { Status } from "@/utils/defines";
import { useAuthContext } from "@features/auth/contexts/AuthContext";
import { useState } from "react";



export default function  ProductButtonBar({className, item}){

	const {isAdmin} = useAuthContext()
    // Hide/Show buttons crud
    const [hide, setHide] = useState(true)

    const handleHide = () => {
      setHide(prev => !prev)
    } 	

    const statusByColor = {
        "ACTIVE": "success",
        "INACTIVE": "dark",
        "DRAFT": "dark",
        "DELETED": "danger"
    } 

	return(
             <div  className={
                `d-flex gap-2 position-absolute w-100 left-0 justify-content-between px-2 ${className}`
            }>
  
                <div className='d-flex gap-2'>
                    {hide && (
                        <>
                            {/* <IconFill
                               className="border rounded-circle bg-wh01" 
                               action={handleAddFavorite}
                               icon="heart"
                            />*/}
                            {item?.meta?.status !== "ACTIVE" && (
                                <StatusPill status={item?.meta?.status} />
                            )}

                        </>
                    )}

                    {!hide && (
                        <>  <div style={{scale: '.9'}}>
                                <EditFloatButton item={item} />
                            </div>
                            {/* <DeleteFloatButton item={item} />*/}
                            <div style={{scale: '.9'}}>
                                <StatusFloatButton item={item} /> 
                            </div>
                        </>
                    )}

                </div>
                    
                {isAdmin && (
                    <div style={{scale: '.9'}}>
                        <IconTint
                          className="rounded-circle align-selft-end" 
                          action={handleHide}
                          icon={`three-dots${hide ? '' : '-vertical'}`}
                        />
                    </div>
                )}

              </div>
	)
}