import ImageWithFallback from "@/components/common/ImageWithFallback";
import userDefault from "/user-default-xl.png";


export default function FormUserImage({children, crudHook}){
	
	const { currentItem } = crudHook

	return (
		<div>
		
		  <p className="fw-medium">
          	{children}
      	  </p>

          <ImageWithFallback
            className="rounded-3 border mb-3 mx-auto" 
            src={currentItem?.image || '#'}
            fallbackSrc={userDefault}
            width={90} 
            height={90}
          />

        </div>  
	)
}