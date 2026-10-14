

export default function Pill({variant, icon, children, className}){
	
	return(
        <div style={{lineHeight:'13px'}} className={`d-inline-block my-2 z-index-10 ${className}`}>    
            <span className={`pill-base ${variant} text-lowercase`}> 
                { icon && <i className={`me-2 ${icon}`}/>}
                {children} 
            </span>
        </div>
	)
}