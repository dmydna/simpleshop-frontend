export default function SocialButton({social='image', variant='primary', visibleName=false}){
	
	return(
 	<div className="text-capitalize small fw-medium">
     	<span style={{width: '55px', height: '55px'}} 
     		className={`btn mx-auto d-flex justify-content-center align-items-center bg-${variant} rounded-circle`}>
        	<i className={`bi bi-${social} text-white m-0 p-0 fs-2`}/>
        </span>
       	{visibleName && <p className="text-center my-1">{social}</p>}
    </div>
	)
}