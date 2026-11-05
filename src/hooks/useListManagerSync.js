import { useUrlParams } from "@hooks/useUrlParams";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";






/** Este hook  sincroniza los parametros busquedas con los componentes
 * que integran las listas crud del dashboard (e.i: ProductTable, ProductFilter)*/
export const useListManagerSync = ({ baseHook }) => {

    const {setFilters, setCurrentPage, totalElements, setId, ...props} = baseHook;

    const [searchParams, setSearchParams] = useSearchParams();

    const {availabilityParam, tableVersion, tagsParam, hashParam, pageParam,
       idParam, searchParam, categoryParam, statusParam, roleParam,
       sortParam, minPrice, maxPrice, queryParam, typeParam } = useUrlParams()


    useEffect(() => {
        if (!searchParam)   { setFilters({}) }
        if (availabilityParam) {setFilters({ availabilityStatus: availabilityParam })}
        if (pageParam)      { setCurrentPage(Number(pageParam))}
        if (!pageParam)     { setCurrentPage(1) }
        if (isNaN(Number(pageParam))) { setCurrentPage(1) }
        if (queryParam)     {
            if(typeParam){
                setFilters({ query: queryParam, qtype: typeParam })
            }else{
                setFilters({ query: typeParam })
            }
        }
        if (typeParam)      {
            if(queryParam){
                setFilters({ query: queryParam, type: typeParam })
            }else{
                setFilters({ qtype: typeParam })
            }
        }
        if (tagsParam)      { setFilters({ tags: tagsParam }) }
        if (roleParam)      { setFilters({ role: roleParam }) }
        if (categoryParam)  { setFilters({ category: categoryParam }) }
        if (searchParam)    { setFilters({ title: searchParam }) }
        if (hashParam)      { setId( hashParam || idParam ) } else { setId( null ) }
        if (tableVersion)   { props?.refreshData() }
        if (statusParam)    { setFilters({ status: statusParam }) }
        if (sortParam)      { setFilters({ sort: sortParam }) }
        if (minPrice && maxPrice) {setFilters({ minPrice, maxPrice })}

    }, [tagsParam, pageParam, categoryParam, tableVersion, statusParam,
        searchParam, setFilters, setCurrentPage, totalElements,availabilityParam,setId,
        sortParam, minPrice, maxPrice, queryParam
    ])


    return {
        searchParams,
        setSearchParams,
        hashParam,
        idParam
    }
}
