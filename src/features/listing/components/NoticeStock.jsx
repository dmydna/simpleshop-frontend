import { useMemo } from 'react';

export default function NoticeStock({stock}){
	
	const availabityText = useMemo(() => {
  	
    	if (!stock) return "not availabity"
    	let quantity = 0;
    	if (stock > 10) quantity = "10";
    	if (stock > 20) quantity = "20";
    	if (stock > 30) quantity = "30";
    	if (stock > 50) quantity = "50";
	
    	if (quantity != 0) return `+${quantity} availability`
    	
    	return `last ${stock} units`  

  	}, [stock])

	return(
        <div style={{ minWidth: '150px' }} className="mx-auto small d-flex justify-content-end align-items-center flex-fill">
          <small className="bg-success text-primary bg-opacity-10 rounded-3 px-1  text-end" >
            <i className="bi bi-exclamation-circle"></i>
            <span className="mx-2">{availabityText}</span>
          </small>
        </div>
	)
}