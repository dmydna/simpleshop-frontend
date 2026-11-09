import DockbarLink from "@/features/dockbar/components/DockbarLink";
import DockbarToggle from "@/features/dockbar/components/DockbarToggle";
import { URL_DASHBOARD, URL_DEV, URL_LISTING_LIST, URL_PRODUCT_LIST, URL_USER_LIST } from "@/utils/links";

export default function DockbarAdmin() {

    return (
        <ul className="list-group list-group-flush">


            <div className="mt-2 mb-4">
                <DockbarToggle />
            </div>

            <DockbarLink
                className='mb-4 fade-hover-1'
                to={URL_DASHBOARD}
                icon="bi-gear"
                label="panel"
            />


            <DockbarLink
                className="mb-4 fade-hover-1"
                to={URL_LISTING_LIST}
                icon="bi-sticky"
                label="listings"
            />

            <DockbarLink
                className="mb-4 fade-hover-1"
                to={URL_PRODUCT_LIST}
                icon="bi-box-seam"
                label="products"
            />

            <DockbarLink
                 className="mb-4 fade-hover-1"
                to={URL_USER_LIST}
                icon="bi-person"
                label="users"
            />


            <DockbarLink
                className="mb-3 d-none fade-hover-1"
                to={URL_DEV}
                icon="bi-terminal"
                label="demo"
            />


        </ul>

    )
}
