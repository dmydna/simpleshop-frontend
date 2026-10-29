export default function ListingDetailStatus({status, className,children }){
	
	return(
       <>
		{status === "INACTIVE" && 
			<small class="w-100">
       	    	<div class={`small fade alert alert-primary show w-100 p-2 text-center text-uppercase my-2`}>
       	    	  <i class="bi bi-info-circle me-2"></i>
       	    	  Publicacion <b>Pausada</b>
       	    	</div>
       		</small>}
       	{status === "DRAFT" && 
       	    <small class="w-100">
           		<div class={`small fade alert alert-primary show w-100 p-2 text-center text-uppercase my-2`}>
           	  		<i class="bi bi-info-circle me-2"></i>
           	  		Publicacion <b>Borrador</b>
           		</div>
            </small>}
        {status === "DELETED" && 
            <small class="w-100"> 
           		<div class={`small fade alert alert-danger show w-100 p-2 text-center text-uppercase my-2`}>
             		<i class="bi bi-info-circle me-2"></i>
            	 	Publicacion <b>Eliminada</b>
           		</div>
           </small>}
        {status === "ACTIVE"  && children}   	
       </>
	)
}
