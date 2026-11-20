export default function CircleButton({size='35px', className='', children, onClick}){
	
	return(
	    <div onClick={onClick} style={{width: size, height: size}} 
	         className={`d-flex pointer border bg-hover rounded-circle 
	         align-items-center justify-content-center ${className}`}>
                  {children}
        </div>
    )          
}
