import { HoverIcon } from "@/components/common/FloatButtonCollection";
import { listingService } from "@/features/listing/services/listingService";
import { useAsync } from "@hooks/useAsync";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useMemo } from "react"
import { useUrlState } from "@/hooks/useUrlState";

export default function SharedFloatButton({item, style, className}){
	

    const { setSearchParams } = useUrlState()
    const [copied, setCopied] = useState(false);


    const msg_show = "copied link"

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href || '');
        setCopied(true);
        toast.success(msg_show);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShowShared= () => {
      setSearchParams(prev => ({...prev, dialog: 'shared'}))
    }

	return (
        <HoverIcon
           disabled={copied}
           style={style}
           className={`border rounded-circle bg-wh01 ${className}`} 
           action={ handleShowShared }
           icon={"share"}
        />
	)
}
