import { useUrlParams } from "@hooks/useUrlParams";
import { useEffect } from "react";

/**
 * Agrega busqueda, paginacion y 
 * filtrado basico por searchParams
 */
export const useListingSync = ({ 
    setFilters, 
    setCurrentPage, 
    totalElements 
    }) => {

    const {tagsParam, minPrice, maxPrice ,pageParam, queryParam, filterParam, 
    categoryParam, allParams, searchParam} 
    = useUrlParams();

    useEffect(() => {
        if(!searchParam)          { setFilters({})}
        if (tagsParam)            { setFilters( prev => ({ ...prev, tags: tagsParam }) ) }            
        if (!pageParam)           { setCurrentPage(1) }
        if (!isNaN(pageParam))    { setCurrentPage(Number(pageParam)) }
        if (queryParam)           { setFilters({ query: queryParam }) }
        if (categoryParam)        { setFilters({category: categoryParam}) }
        if (!allParams)           { setFilters({})}
        if (minPrice && maxPrice) { setFilters({ minPrice, maxPrice })}

    }, [searchParam,minPrice, maxPrice, tagsParam, minPrice, 
        maxPrice,pageParam, categoryParam, filterParam, allParams, setFilters, 
        setCurrentPage, totalElements, queryParam])


    return {tagsParam, pageParam, categoryParam, queryParam}
}