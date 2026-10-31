import { useEffect, useState, useMemo } from "react";


export default function CatalogeHeader({filters, totalElements}){
	
  const DEFAULT_META = { 
  	title: "Products", 
  	message: "All cataloge"
  }

  const SEARCH_META = useMemo(()=> ({
       title: "Results",
       message: `${totalElements} found` 	
  }),[totalElements])

  const CATEGORY_META = useMemo(()=> ({ 
  	title: filters?.category, 
  	message: "Category"
  }),[filters])


  const [meta, setMeta] = useState(DEFAULT_META);

  useEffect(() => {

    if (filters && Object.keys(filters).length == 0) {
      setMeta(DEFAULT_META);  
    }
    if (filters?.category) {
      setMeta(CATEGORY_META);
    }
    if (filters?.query || filters?.maxPrice || filters?.tags) {
      setMeta(SEARCH_META);
    }
  }, [filters])


	return (
         <div className="w-100 d-flex flex-column mt-2 mb-4">
           <span className="text-capitalize fw-semibold me-3 fs-5 fw-medium" >
             {meta.title}
           </span>
           <span style={{ lineHeight: '2.3rem' }} className="text-secondary">
             {meta.message}
           </span>
         </div>
	)
}