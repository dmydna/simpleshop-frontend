import { useListing } from "@/features/listing/hooks/useListing";
import SearchLive from "@/features/search/SearchLive";
import { URL_LISTING_CRUD, URL_LISTING_LIST } from "@/utils/links";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingTable from "@/features/listing/components/ListingTable";




const ListingListPage = () => {

    const navigate = useNavigate();
    const baseHook = useListing({ autofetch: true });
    const { listings, setFilters } = baseHook;
    const [search, setSearch] = useState();

    // URLs
    const FORM_URL = URL_LISTING_CRUD;
    const CURRENT_URL = URL_LISTING_LIST;

    useEffect(() => {
        if (search) setFilters({ page: 0, title: search })
    }, [search])

    return (
        <>
            <div className="visually-hidden">
                <p className="h5 mb-3">
                    Post List
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
                    items={listings}
                    handleSearch={setSearch}
                    handleFilter={() => navigate(`${CURRENT_URL}?dialog=filter`)}
                />
            </div>

            <ListingTable baseHook={baseHook} />
        </>
    );
}

export default ListingListPage;
