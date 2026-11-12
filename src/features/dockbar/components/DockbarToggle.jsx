import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import { IconTint } from "@common/IconTintyColor";
import { useCallback } from "react";

export default function DockbarToggle({id, className}){
	
	const {isAdmin, isAuth} = useAuthContext()

	const handle = useCallback(()=>{
		if (document.querySelector("body")) {
        	const body = document.querySelector("body");
        	if([...body.classList].includes("active-bar")){
        		body.classList.remove("active-bar")
        	}else{
        		body.classList.add("active-bar")
        	}	
		}
	},[])


	return (
		<>
		{isAdmin &&
	    	<div id={id} 
	    		onClick={()=>handle()}
	    		style={{left: 5, zIndex:1051}} className={`pointer ${className}`}>
        	    <IconTint fs={5} size={40} icon="bi bi-list"  />
        	</div> 
		}
		</>
	)
}