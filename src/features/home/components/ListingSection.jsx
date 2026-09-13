import ListingCard from '@/features/listing/components/ListingCard.jsx';
import { useListing } from "@f/listing/hooks/useListing.js";
import { useEffect, useMemo } from 'react';

function ListingSection({children, maxElems=1 ,filter, maxCols, className, borders}){

    const { listings, setFilters } = useListing({autofetch: true, size: maxElems})

    useEffect(()=>{
      setFilters(filter)
    },[filter])


    
    const colClass = useMemo(() => {
      if (maxCols >= 4) return 'col-lg-3 col-md-4 col-sm-6 col-12'
    
      const fix = Math.floor(12 / maxCols)
      return `col-lg-${fix} col-md-${fix} col-sm-12 col-12`
    }, [maxCols])



    return(
      <div className={`${className}  h-100`}>
        <div className='row'>
          {children}
        {listings?.slice(0, maxElems).map((p) => (
            <ListingCard
              {...p}
              key={p.id}
              className={'border-0 m-0 p-0'} 
              cols={colClass}
            />
        ))}
        </div>
        </div>

    )
}
export default ListingSection;