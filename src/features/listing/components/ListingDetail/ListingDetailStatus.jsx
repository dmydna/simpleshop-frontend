export default function ListingDetailStatus({status, children }){
	
	return(
       <>
		{status === "INACTIVE" && 
       	    <div class="fade alert alert-primary show w-100">
       	      <i class="bi bi-info-circle me-2"></i>
       	      Publicacion <b>Pausada</b>
       	    </div>}
       	{status === "DRAFT" && 
           	<div class="fade alert alert-primary show w-100">
           	  <i class="bi bi-info-circle me-2"></i>
           	  Publicacion <b>Borrador</b>
           	</div>}
        {status === "DELETED" && 
           	<div class="fade alert alert-danger show w-100">
             		<i class="bi bi-info-circle me-2"></i>
            	 	Publicacion <b>Eliminada</b>
           	</div>}
        {status === "ACTIVE"  && children}   	
       </>
	)
}