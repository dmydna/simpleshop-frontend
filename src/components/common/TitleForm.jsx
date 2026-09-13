import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function TitleForm(){
	
  	const [title, setTitle] = useState()
  	
    const { editMode, viewMode, createMode, copyMode } = useUrlParams();
    
    const {setSearchParams} = useUrlState()

    const location = useLocation();

	useEffect(() => {

       const [domian, subdomian] = location.pathname.split('/').pop().split('-');

	   if(subdomian == "list"){
        	setTitle(`${domian}`)
	   }
    
	   if(subdomian == "form"){
        	if (editMode) setTitle(`Edit ${domian}`);
        	if (createMode || copyMode) setTitle(`Add ${domian}`);
        	if (viewMode) setTitle(`${domian} Summary `);
	   }

    }, [editMode, createMode, copyMode, viewMode, location.pathname])

    
	return (
        <div className="d-flex justify-content-between mb-3">
            <p className="fw-medium fs-5 text-capitalize">{ title }</p>
            <i onClick={() => setSearchParams(prev => ({ ...prev, dialog: "action" }))} 
                className="d-block d-md-none btn btn-light mb-3 bi bi-gear">
            </i>
        </div>	
     )
}