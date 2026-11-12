import { IconTint } from "@/components/common/FloatButtonCollection"
import { useAuthContext } from "@/features/auth/contexts/AuthContext"
import DeleteFloatButton from "@/features/listing/components/Button/DeleteFloatButton"
import EditFloatButton from "@/features/listing/components/Button/EditFloatButton"
import FavoriteFloatButton from "@/features/listing/components/Button/FavoriteFloatButton"
import StatusFloatButton from "@/features/listing/components/Button/StatusFloatButton"
import SharedFloatButton from "@/features/listing/components/Button/SharedFloatButton"
import { useState } from "react"
import ProtectedAction from "@/components/common/ProtectedAction"

export default function AdminFloatButton({item, style, className}){

	const {isAdmin} = useAuthContext();
	const [hide, setHide] = useState(false);


    const handleHide = () => {
      setHide(prev => !prev)
    }


	return (
		<div
			style={style}
			className={`${className} d-flex gap-2 ${item?.meta?.status == 'DELETED' ? 'd-none' : ''}`}
		>
			{hide && (
				<div className="d-flex gap-2">
          {/*<DeleteFloatButton item={item} /> */}
					<StatusFloatButton item={item} />
					<EditFloatButton   item={item} />
				</div>
			)}
			{!hide && (
				<div className="d-flex gap-2">
					<ProtectedAction>
						<FavoriteFloatButton item={item} />
					</ProtectedAction>
					<SharedFloatButton item={item} />
				</div>
			)}
			{isAdmin && (
    	  <IconTint
    	    className="rounded-circle align-selft-end"
    	    action={handleHide}
    	    icon={`three-dots${hide ? '' : '-vertical'}`}
    	  />
			)}
    	</div>
	)
}
