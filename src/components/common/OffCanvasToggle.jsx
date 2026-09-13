import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import { useState } from "react";

export default function OffCanvasToggle({variant="primary", icon="bi-list-ul", top="100px" }){
	
    const { setSearchParams } = useUrlState()
    const { dialogParam } = useUrlParams()


	const handle = () => {
        if(dialogParam && dialogParam == 'offCanvas'){
            setSearchParams(prev => ({...prev, dialog: null }))
        }else{
            setSearchParams(prev => ({...prev, dialog: 'offCanvas' }))
        }
    }

  const [isHovered, setIsHovered] = useState(false);
  const posFix = `-3px`


	return (
		<div onClick={handle} class={`bg-${variant} bg-opacity-75 d-block d-md-none position-fixed p-3 pe-4`}
      		 onMouseEnter={() => setIsHovered(true)}
      		 onMouseLeave={() => setIsHovered(false)}
			 style={{
			   top: top, 
			   right: isHovered ? '-2px': '-9px',
			   transition: 'all .2s',
			   borderRadius: "30px 0px 0px 30px",
			   zIndex: "5",
			   cursor: "pointer"
		     }}>
			 	<span class="btn" 
			 	 style={{ 
			 	   lineHeight: "0px", 
			 	   padding: "0px", 
			 	   position: "relative", 
			 	   cursor: "pointer", 
			 	   display: "inline-flex",
			 	   alignItems: "center", 
			 	   justifyContent: "center"  
			 	}}>
			 	 	<i class="bi-list-ul text-light fs-4" 
			 	 	   style={{zIndex: "2", position: "relative"}}>
			 	 	</i>
			 	 </span>
		</div>
	)
}