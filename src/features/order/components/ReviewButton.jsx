import { useUrlState } from "@/hooks/useUrlState"


export default function ReviewButton({reviewId}){
	
	const { setSearchParams } = useUrlState()
	
	const handle = () =>{
		setSearchParams(prev => ({...prev, id:reviewId }))
	}

	return (
	  <span 
        	onClick={handle}
            style={{ fontSize: '11px', width: '50px' }} 
            className="small pill-base pill-primary pointer">
            <i className="bi bi-star mx-2"></i>
                  valorar producto
        </span>
      )
}