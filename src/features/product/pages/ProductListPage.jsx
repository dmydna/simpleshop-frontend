import { URL_PRODUCT_CRUD } from "@/utils/links";
import ProductTable from "@/features/product/components/ProductTable";
import SearchLight from "@/features/search/SearchLight";
import AddNewButton from "@/features/form/components/AddNewButton";


export default function ProductListPage(){


    return (        
        <>
            <div className="visually-hidden">
                <p className="h5 mb-3">
                    Products List
                </p>
                
            </div>
            <div className="d-flex justify-content-between mb-4 flex-wrap" >
                <AddNewButton to={`${URL_PRODUCT_CRUD}?mode=create`} />
                <SearchLight/>
            </div>
            <ProductTable />
        </>

    );
}
