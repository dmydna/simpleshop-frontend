import { URL_LISTING_CRUD } from "@/utils/links";
import ListingTable from "@/features/listing/components/ListingTable";
import SearchLight from "@/features/search/SearchLight";
import AddNewButton from "@/features/form/components/AddNewButton";


const ListingListPage = () => {

    return (
        <>
            <div className="visually-hidden">
                <p className="h5 mb-3">
                    Post List
                </p>
            </div>
            
            <div className="d-flex justify-content-between mb-4 flex-wrap" >
                <AddNewButton to={`${URL_LISTING_CRUD}?mode=create`} />
                <SearchLight className='flex-fill flex-md-grow-0'/>
            </div>

            <ListingTable />
        </>
    );
}

export default ListingListPage;
