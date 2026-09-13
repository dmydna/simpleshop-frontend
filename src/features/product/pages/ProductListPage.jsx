import { useProduct } from "@/features/product/hooks/useProduct";
import SearchLive  from "@/features/search/SearchLive";
import { URL_PRODUCT_CRUD, URL_PRODUCT_LIST } from "@/utils/links";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductTable from "@/features/product/components/ProductTable";


export default function ProductListPage(){

    const navigate = useNavigate()
    const baseHook = useProduct({ autofetch: true })
    const { setFilters, products } = baseHook;
    const [search, setSearch] = useState()

    // URLs
    const FORM_URL = URL_PRODUCT_CRUD;
    const CURRENT_URL = URL_PRODUCT_LIST;

    useEffect(() => {
        if (search) setFilters({ page: 0, name: search })
    }, [search])


    return (
        
        <>
            <div className="visually-hidden">
                <p className="h5 mb-3">
                    Products List
                </p>
                
            </div>
            <div className="d-flex justify-content-between mb-4 flex-wrap" >
                <Button
                    variant="light"
                    onClick={() => navigate(`${FORM_URL}?mode=create`)}
                    className="my-2 flex-fill flex-md-grow-0">
                    <i className="bi bi-plus-lg"></i>
                    <span className="fw-medium ms-2">Create new</span>
                </Button>
                <SearchLive
                    className='flex-fill flex-md-grow-0'
                    items={products}
                    handleSearch={setSearch}
                    handleFilter={() => navigate(`${CURRENT_URL}?dialog=filter`)}
                />
            </div>
            <ProductTable baseHook={baseHook} />
        </>

    );
}
