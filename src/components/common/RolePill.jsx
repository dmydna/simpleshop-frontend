export default function RolePill({role}){
	
    const colorAcent = Object.freeze({
       "ADMIN":   "pill-dark",
       "CLIENT":  "pill-primary",
    /* --------------------------------- */
    })


	return (
        <>
        {role &&
        <div style={{lineHeight:'13px'}} className="d-inline-block my-2 z-index-10">    
            <span className={`pill-base ${colorAcent[role]} text-lowercase`}> 
                {role} 
            </span>
        </div>}
        </>
	)
}